import React, { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import pocketbase from "../../services/pocketbase";
import styles from "./Admin.module.css";
import { Modalidade } from "../../services/types";

interface CollectionField {
  name: string;
  label: string;
  type: string;
  multiple?: boolean;
  maxFiles?: number;
}

interface CollectionConfig {
  id: string;
  label: string;
  icon: string;
  sort?: string;
  title: string;
  fields: CollectionField[];
}

interface AdminRecord {
  id: string;
  [key: string]: any;
}

interface RecordEditorProps {
  config: CollectionConfig;
  record?: AdminRecord;
  onClose: () => void;
  onSaved: (message: string) => void;
}

interface LoginProps {
  onLogin: () => void;
}

interface FileFieldProps {
  field: CollectionField;
  record: AdminRecord | null;
  onRemoveFile: (fieldName: string, fileName: string) => void;
}

const COLLECTIONS: CollectionConfig[] = [
  {
    id: "noticias",
    label: "Notícias",
    icon: "pi pi-megaphone",
    sort: "-data",
    title: "titulo",
    fields: [
      { name: "titulo", label: "Título", type: "text" },
      { name: "sumario", label: "Resumo", type: "textarea" },
      { name: "data", label: "Data de publicação", type: "date" },
      { name: "imagem", label: "Imagem de capa", type: "file" },
      { name: "texto", label: "Conteúdo", type: "richtext" },
    ],
  },
  {
    id: "eventos",
    label: "Eventos",
    icon: "pi pi-calendar",
    sort: "-data",
    title: "nome",
    fields: [
      { name: "marcador", label: "Marcador / edição", type: "text" },
      { name: "nome", label: "Nome do evento", type: "text" },
      { name: "data", label: "Data", type: "date" },
      {
        name: "qtd_participantes",
        label: "Quantidade de participantes",
        type: "number",
      },
      {
        name: "imagens",
        label: "Imagens do evento",
        type: "files",
        multiple: true,
        maxFiles: 30,
      },
      {
        name: "modalidades",
        label: "Modalidades e pódios",
        type: "modalities",
      },
    ],
  },
  {
    id: "galerias",
    label: "Galerias",
    icon: "pi pi-images",
    sort: "-data",
    title: "nome",
    fields: [
      { name: "nome", label: "Nome da galeria", type: "text" },
      { name: "descricao", label: "Descrição", type: "textarea" },
      { name: "data", label: "Data", type: "date" },
      {
        name: "imagens",
        label: "Fotos",
        type: "files",
        multiple: true,
        maxFiles: 30,
      },
    ],
  },
  {
    id: "links",
    label: "Links úteis",
    icon: "pi pi-link",
    sort: "nome",
    title: "nome",
    fields: [
      { name: "nome", label: "Nome", type: "text" },
      { name: "url", label: "Endereço", type: "url" },
      { name: "imagem", label: "Imagem / ícone", type: "file" },
    ],
  },
  {
    id: "textos",
    label: "Textos do site",
    icon: "pi pi-file-edit",
    sort: "identificador",
    title: "titulo",
    fields: [
      { name: "identificador", label: "Identificador", type: "text" },
      { name: "titulo", label: "Título", type: "text" },
      { name: "texto", label: "Conteúdo", type: "richtext" },
    ],
  },
  {
    id: "contatos",
    label: "Contatos",
    icon: "pi pi-comments",
    sort: "ordem",
    title: "texto",
    fields: [
      { name: "ordem", label: "Ordem de exibição", type: "number" },
      { name: "icone", label: "Classe do ícone PrimeIcons", type: "text" },
      { name: "texto", label: "Texto", type: "text" },
      { name: "url", label: "Endereço", type: "url" },
      { name: "convite", label: "Exibir na área de convite", type: "boolean" },
    ],
  },
  {
    id: "apoiadores",
    label: "Apoiadores",
    icon: "pi pi-heart",
    sort: "nome",
    title: "nome",
    fields: [
      { name: "nome", label: "Nome", type: "text" },
      { name: "url", label: "Endereço", type: "url" },
      { name: "logo", label: "Logo", type: "file" },
    ],
  },
  {
    id: "faq",
    label: "Perguntas frequentes",
    icon: "pi pi-question-circle",
    title: "pergunta",
    fields: [
      { name: "pergunta", label: "Pergunta", type: "text" },
      { name: "resposta", label: "Resposta", type: "textarea" },
    ],
  },
];

const getErrorMessage = (error: any) =>
  error?.response?.message ||
  error?.message ||
  "Não foi possível concluir a operação. Tente novamente.";

const toDateInput = (value: any) => {
  if (!value) return "";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "";

  const pad = (part: number) => String(part).padStart(2, "0");

  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
};

const fileNamesFor = (record: any, fieldName: string): string[] => {
  const value = record?.[fieldName];
  if (Array.isArray(value))
    return value.filter(
      (item): item is string => typeof item === "string" && Boolean(item),
    );
  return typeof value === "string" && value ? [value] : [];
};

const normalizeModalities = (value: any) =>
  Array.isArray(value)
    ? value.map((modality) => ({
        categoria: modality?.categoria || "",
        podio: Array.isArray(modality?.podio)
          ? modality.podio.map((player: any) => ({
              jogador: player?.jogador || "",
              posicao: player?.posicao || "",
            }))
          : [],
      }))
    : [];

const decodeHtmlEntitiesInText = (value: string) => {
  const decoder = document.createElement("textarea");

  return value.replace(
    /(<[^>]*>)|&(?:#\d+|#x[\da-f]+|[a-z][a-z\d]+);/gi,
    (match, tag: string | undefined) => {
      if (tag) return tag;
      decoder.innerHTML = match;
      const decoded = decoder.value;
      return decoded === "&" ||
        decoded === "<" ||
        decoded === ">" ||
        decoded === '"' ||
        decoded === "'"
        ? match
        : decoded;
    },
  );
};

interface RichTextFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

function RichTextField({ label, value, onChange }: RichTextFieldProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const initialValue = useRef(value);

  useEffect(() => {
    if (editorRef.current) editorRef.current.innerHTML = initialValue.current;
  }, []);

  const applyFormat = (command: string, commandValue?: string) => {
    const editor = editorRef.current;
    if (!editor) return;
    editor.focus();
    document.execCommand(command, false, commandValue);
    onChange(editor.innerHTML);
  };

  const addLink = () => {
    const url = window.prompt("Endereço do link:");
    if (url) applyFormat("createLink", url);
  };

  return (
    <div className={styles.richTextField}>
      <label>{label}</label>
      <div
        className={styles.editorToolbar}
        role="toolbar"
        aria-label="Formatação"
      >
        <button
          type="button"
          aria-label="Negrito"
          title="Negrito"
          onMouseDown={(event) => event.preventDefault()}
          onClick={() => applyFormat("bold")}
        >
          <strong>B</strong>
        </button>
        <button
          type="button"
          aria-label="Itálico"
          title="Itálico"
          onMouseDown={(event) => event.preventDefault()}
          onClick={() => applyFormat("italic")}
        >
          <em>I</em>
        </button>
        <button
          type="button"
          onMouseDown={(event) => event.preventDefault()}
          onClick={() => applyFormat("formatBlock", "h2")}
        >
          Título
        </button>
        <button
          type="button"
          onMouseDown={(event) => event.preventDefault()}
          onClick={() => applyFormat("insertUnorderedList")}
        >
          Lista
        </button>
        <button
          type="button"
          onMouseDown={(event) => event.preventDefault()}
          onClick={addLink}
        >
          Link
        </button>
        <span>Editor visual</span>
      </div>
      <div
        ref={editorRef}
        className={styles.richTextEditor}
        contentEditable
        suppressContentEditableWarning
        role="textbox"
        aria-multiline="true"
        aria-label={label}
        data-placeholder="Comece a escrever..."
        onInput={(event) => onChange(event.currentTarget.innerHTML)}
      />
      <p className={styles.fieldHint}>
        Use a barra de ferramentas para formatar o conteúdo.
      </p>
    </div>
  );
}

interface ModalitiesFieldProps {
  value: Modalidade[];
  onChange: (value: Modalidade[]) => void;
}

function ModalitiesField({ value, onChange }: ModalitiesFieldProps) {
  const updateModality = (index: number, updated: Modalidade) => {
    onChange(
      value.map((item: Modalidade, itemIndex: number) =>
        itemIndex === index ? updated : item,
      ),
    );
  };

  return (
    <fieldset className={styles.modalities}>
      <legend>Modalidades e pódios</legend>
      {value.map((modality, modalityIndex) => (
        <div className={styles.modalityCard} key={modalityIndex}>
          <div className={styles.modalityHeader}>
            <label>
              Categoria
              <input
                type="text"
                value={modality.categoria}
                onChange={(event) =>
                  updateModality(modalityIndex, {
                    ...modality,
                    categoria: event.target.value,
                  })
                }
              />
            </label>
            <button
              type="button"
              className={styles.removeButton}
              onClick={() =>
                onChange(value.filter((_, index) => index !== modalityIndex))
              }
            >
              Remover modalidade
            </button>
          </div>
          <div className={styles.podiumList}>
            {modality.podio.map((player, playerIndex) => (
              <div className={styles.podiumRow} key={playerIndex}>
                <label>
                  Posição
                  <input
                    type="text"
                    value={player.posicao}
                    onChange={(event) => {
                      const podium = [...modality.podio];
                      podium[playerIndex] = {
                        ...player,
                        posicao: event.target.value,
                      };
                      updateModality(modalityIndex, {
                        ...modality,
                        podio: podium,
                      });
                    }}
                  />
                </label>
                <label>
                  Jogador / equipe
                  <input
                    type="text"
                    value={player.jogador}
                    onChange={(event) => {
                      const podium = [...modality.podio];
                      podium[playerIndex] = {
                        ...player,
                        jogador: event.target.value,
                      };
                      updateModality(modalityIndex, {
                        ...modality,
                        podio: podium,
                      });
                    }}
                  />
                </label>
                <button
                  type="button"
                  className={styles.removeButton}
                  aria-label={`Remover posição ${player.posicao || playerIndex + 1}`}
                  onClick={() =>
                    updateModality(modalityIndex, {
                      ...modality,
                      podio: modality.podio.filter(
                        (_, index) => index !== playerIndex,
                      ),
                    })
                  }
                >
                  <i className="pi pi-times" aria-hidden="true" />
                </button>
              </div>
            ))}
          </div>
          <button
            type="button"
            className={styles.secondaryButton}
            onClick={() =>
              updateModality(modalityIndex, {
                ...modality,
                podio: [
                  ...modality.podio,
                  { jogador: "", posicao: String(modality.podio.length + 1) },
                ],
              })
            }
          >
            <i className="pi pi-plus" aria-hidden="true" /> Adicionar posição
          </button>
        </div>
      ))}
      <button
        type="button"
        className={styles.secondaryButton}
        onClick={() =>
          onChange([
            ...value,
            {
              categoria: "",
              podio: [{ jogador: "", posicao: "1" }],
            },
          ])
        }
      >
        <i className="pi pi-plus" aria-hidden="true" /> Adicionar modalidade
      </button>
    </fieldset>
  );
}

function FileField({ field, record, onRemoveFile }: FileFieldProps) {
  const existingFiles = fileNamesFor(record, field.name);

  return (
    <div className={styles.fileField}>
      <label htmlFor={`upload-${field.name}`}>{field.label}</label>
      {existingFiles.length > 0 && (
        <div className={styles.fileGrid}>
          {existingFiles.map((fileName) => (
            <div className={styles.filePreview} key={fileName}>
              {record && (
                <img src={pocketbase.files.getURL(record, fileName)} alt="" />
              )}
              <span title={fileName}>{fileName}</span>
              <button
                type="button"
                className={styles.removeButton}
                onClick={() => onRemoveFile(field.name, fileName)}
              >
                Remover
              </button>
            </div>
          ))}
        </div>
      )}
      <input
        id={`upload-${field.name}`}
        name={`${field.name}Upload`}
        type="file"
        accept="image/*"
        multiple={field.multiple}
      />
      <p className={styles.fieldHint}>
        {field.multiple
          ? `Selecione imagens${field.maxFiles ? ` (até ${field.maxFiles})` : ""}. As fotos atuais permanecem se não forem removidas.`
          : "Selecione uma imagem para substituir a atual."}
      </p>
    </div>
  );
}

function RecordEditor({ config, record, onClose, onSaved }: RecordEditorProps) {
  const [values, setValues] = useState<Record<string, any>>(() => {
    const initial: Record<string, any> = {};
    config.fields.forEach((field: CollectionField) => {
      if (field.type === "modalities") return;
      const current = record?.[field.name];
      if (field.type === "date") initial[field.name] = toDateInput(current);
      else if (field.type === "boolean") initial[field.name] = Boolean(current);
      else if (field.type === "richtext")
        initial[field.name] = decodeHtmlEntitiesInText(current ?? "");
      else initial[field.name] = current ?? "";
    });
    return initial;
  });
  const [modalities, setModalities] = useState(() =>
    normalizeModalities(record?.modalidades),
  );
  const [removedFiles, setRemovedFiles] = useState<Record<string, string[]>>(
    {},
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const changeValue = (name: string, value: any) =>
    setValues((current) => ({ ...current, [name]: value }));

  const removeFile = (fieldName: string, fileName: string) =>
    setRemovedFiles((current) => ({
      ...current,
      [fieldName]: [...(current[fieldName] || []), fileName],
    }));

  const save = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);
    setError("");

    try {
      const formData = new FormData();
      config.fields.forEach((field: CollectionField) => {
        if (field.type === "file" || field.type === "files") return;
        if (field.type === "modalities") {
          formData.append(field.name, JSON.stringify(modalities));
          return;
        }

        const value = values[field.name];
        if (field.type === "boolean") {
          formData.append(field.name, String(value));
        } else if (field.type === "date") {
          formData.append(
            field.name,
            value ? new Date(value).toISOString() : "",
          );
        } else {
          formData.append(field.name, String(value));
        }
      });

      config.fields
        .filter(
          (field: CollectionField) =>
            field.type === "file" || field.type === "files",
        )
        .forEach((field: CollectionField) => {
          const input = event.currentTarget.elements.namedItem(
            `${field.name}Upload`,
          ) as HTMLInputElement | null;
          const selectedFiles = Array.from(input?.files || []) as File[];
          const keptFiles = fileNamesFor(record, field.name).filter(
            (fileName) => !(removedFiles[field.name] || []).includes(fileName),
          );
          if (
            field.maxFiles &&
            keptFiles.length + selectedFiles.length > field.maxFiles
          ) {
            throw new Error(
              `${field.label}: o limite é de ${field.maxFiles} imagens.`,
            );
          }
          selectedFiles.forEach((file) => formData.append(field.name, file));
          (removedFiles[field.name] || []).forEach((fileName) =>
            formData.append(`${field.name}-`, fileName),
          );
        });

      if (record) {
        await pocketbase.collection(config.id).update(record.id, formData);
      } else {
        await pocketbase.collection(config.id).create(formData);
      }
      onSaved(record ? "Registro atualizado." : "Registro criado.");
    } catch (saveError) {
      setError(getErrorMessage(saveError));
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      className={styles.modalBackdrop}
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !saving) onClose();
      }}
    >
      <section
        className={styles.editorDialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby="editor-title"
      >
        <header className={styles.dialogHeader}>
          <div>
            <span className={styles.eyebrow}>{config.label}</span>
            <h2 id="editor-title">
              {record ? "Editar registro" : "Novo registro"}
            </h2>
          </div>
          <button
            type="button"
            className={styles.iconButton}
            aria-label="Fechar"
            onClick={onClose}
            disabled={saving}
          >
            <i className="pi pi-times" aria-hidden="true" />
          </button>
        </header>

        <form className={styles.editorForm} onSubmit={save}>
          {config.fields.map((field) => {
            if (field.type === "file" || field.type === "files") {
              return (
                <FileField
                  key={field.name}
                  field={field}
                  record={
                    record
                      ? {
                          ...record,
                          [field.name]: fileNamesFor(record, field.name).filter(
                            (fileName) =>
                              !(removedFiles[field.name] || []).includes(
                                fileName,
                              ),
                          ),
                        }
                      : null
                  }
                  onRemoveFile={removeFile}
                />
              );
            }

            if (field.type === "richtext") {
              return (
                <RichTextField
                  key={field.name}
                  label={field.label}
                  value={values[field.name]}
                  onChange={(value) => changeValue(field.name, value)}
                />
              );
            }

            if (field.type === "modalities") {
              return (
                <ModalitiesField
                  key={field.name}
                  value={modalities}
                  onChange={setModalities}
                />
              );
            }

            if (field.type === "boolean") {
              return (
                <label className={styles.checkboxField} key={field.name}>
                  <input
                    type="checkbox"
                    checked={values[field.name]}
                    onChange={(event) =>
                      changeValue(field.name, event.target.checked)
                    }
                  />
                  <span>{field.label}</span>
                </label>
              );
            }

            if (field.type === "textarea") {
              return (
                <label className={styles.formField} key={field.name}>
                  {field.label}
                  <textarea
                    value={values[field.name]}
                    onChange={(event) =>
                      changeValue(field.name, event.target.value)
                    }
                    rows={4}
                  />
                </label>
              );
            }

            return (
              <label className={styles.formField} key={field.name}>
                {field.label}
                <input
                  type={
                    field.type === "date"
                      ? "datetime-local"
                      : field.type === "number"
                        ? "number"
                        : field.type
                  }
                  step={field.type === "number" ? "any" : undefined}
                  value={values[field.name]}
                  readOnly={field.name === "Identificador"}
                  onChange={(event) =>
                    changeValue(field.name, event.target.value)
                  }
                />
              </label>
            );
          })}

          {error && (
            <div className={styles.formError} role="alert">
              <i className="pi pi-exclamation-circle" aria-hidden="true" />
              {error}
            </div>
          )}
          <footer className={styles.formActions}>
            <button
              type="button"
              className={styles.cancelButton}
              onClick={onClose}
              disabled={saving}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className={styles.primaryButton}
              disabled={saving}
            >
              {saving ? "Salvando..." : "Salvar alterações"}
            </button>
          </footer>
        </form>
      </section>
    </div>
  );
}

function Login({ onLogin }: LoginProps) {
  const [identity, setIdentity] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      await pocketbase
        .collection("_superusers")
        .authWithPassword(identity.trim(), password);
      setPassword("");
      onLogin();
    } catch (loginError: any) {
      setError(
        loginError?.status === 400 || loginError?.status === 401
          ? "Usuário ou senha inválidos."
          : getErrorMessage(loginError),
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className={styles.loginPage}>
      <section className={styles.loginCard}>
        <div className={styles.loginIcon}>
          <i className="pi pi-shield" aria-hidden="true" />
        </div>
        <span className={styles.eyebrow}>Área restrita</span>
        <h1>Acesso administrador</h1>
        <p>
          Entre com uma conta superusuária do PocketBase para gerenciar o
          conteúdo do site.
        </p>
        <form onSubmit={submit} className={styles.loginForm}>
          <label className={styles.formField}>
            E-mail ou usuário
            <input
              type="text"
              autoComplete="username"
              value={identity}
              onChange={(event) => setIdentity(event.target.value)}
              required
            />
          </label>
          <label className={styles.formField}>
            Senha
            <input
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </label>
          {error && (
            <div className={styles.formError} role="alert">
              <i className="pi pi-exclamation-circle" aria-hidden="true" />
              {error}
            </div>
          )}
          <button
            type="submit"
            className={styles.primaryButton}
            disabled={submitting}
          >
            {submitting ? "Verificando acesso..." : "Entrar"}
            {!submitting && (
              <i className="pi pi-arrow-right" aria-hidden="true" />
            )}
          </button>
        </form>
        <div className={styles.loginFootnote}>
          <i className="pi pi-lock" aria-hidden="true" />A autenticação é
          validada pelo próprio PocketBase.
        </div>
      </section>
    </main>
  );
}

function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    pocketbase.authStore.isValid && pocketbase.authStore.isSuperuser,
  );
  const [activeCollection, setActiveCollection] = useState(COLLECTIONS[0].id);
  const [records, setRecords] = useState<AdminRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState("");
  const [search, setSearch] = useState("");
  const [editorRecord, setEditorRecord] = useState<AdminRecord | undefined>(
    undefined,
  );
  const [editorOpen, setEditorOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [notice, setNotice] = useState("");

  const config =
    COLLECTIONS.find((item) => item.id === activeCollection) || COLLECTIONS[0];

  useEffect(() => {
    const unsubscribe = pocketbase.authStore.onChange(() => {
      setIsAuthenticated(
        pocketbase.authStore.isValid && pocketbase.authStore.isSuperuser,
      );
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (!isAuthenticated) return undefined;
    let active = true;
    setLoading(true);
    setLoadError("");
    pocketbase
      .collection(activeCollection)
      .getFullList(config.sort ? { sort: config.sort } : undefined)
      .then((result) => {
        if (active) setRecords(result as unknown as AdminRecord[]);
      })
      .catch((error) => {
        if (active) setLoadError(getErrorMessage(error));
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [activeCollection, config.sort, isAuthenticated, refreshKey]);

  useEffect(() => {
    if (!notice) return undefined;
    const timeout = window.setTimeout(() => setNotice(""), 3500);
    return () => window.clearTimeout(timeout);
  }, [notice]);

  const filteredRecords = useMemo(() => {
    const query = search.trim().toLocaleLowerCase();
    if (!query) return records;
    return records.filter((record) =>
      JSON.stringify(record).toLocaleLowerCase().includes(query),
    );
  }, [records, search]);

  const getRecordTitle = (record: AdminRecord) => {
    const title = record[config.title];
    if (title)
      return String(title)
        .replace(/<[^>]*>/g, "")
        .trim();
    return "Registro sem título";
  };

  const signOut = () => {
    pocketbase.authStore.clear();
    setRecords([]);
    setNotice("");
  };

  const deleteRecord = async (record: AdminRecord) => {
    const title = getRecordTitle(record);
    if (
      !window.confirm(`Excluir "${title}"? Esta ação não pode ser desfeita.`)
    ) {
      return;
    }

    setLoadError("");
    try {
      await pocketbase.collection(activeCollection).delete(record.id);
      setRecords((current) => current.filter((item) => item.id !== record.id));
      setNotice("Registro excluído.");
    } catch (error) {
      setLoadError(getErrorMessage(error));
    }
  };

  if (!isAuthenticated)
    return <Login onLogin={() => setIsAuthenticated(true)} />;

  return (
    <main className={styles.adminPage}>
      <aside className={styles.sidebar}>
        <div className={styles.brand}>
          <span className={styles.brandIcon}>
            <i className="pi pi-bolt" aria-hidden="true" />
          </span>
          <div>
            <strong>IPFX</strong>
            <span>Painel de conteúdo</span>
          </div>
        </div>
        <span className={styles.navCaption}>GERENCIAR</span>
        <nav className={styles.collectionNav} aria-label="Coleções de conteúdo">
          {COLLECTIONS.map((item) => (
            <button
              type="button"
              key={item.id}
              className={`${styles.navItem} ${activeCollection === item.id ? styles.navItemActive : ""}`}
              onClick={() => {
                setActiveCollection(item.id);
                setSearch("");
              }}
            >
              <i className={item.icon} aria-hidden="true" />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
        <div className={styles.sidebarBottom}>
          <div className={styles.secureBadge}>
            <i className="pi pi-shield" aria-hidden="true" />
            <span>Sessão superusuária</span>
          </div>
          <button
            type="button"
            className={styles.signOutButton}
            onClick={signOut}
          >
            <i className="pi pi-sign-out" aria-hidden="true" />
            Sair do painel
          </button>
        </div>
      </aside>

      <section className={styles.workspace}>
        <header className={styles.topbar}>
          <div>
            <span className={styles.breadcrumb}>Administração / Conteúdo</span>
            <h1>Acesso administrador</h1>
          </div>
          <span className={styles.connectionBadge}>
            <span />
            PocketBase conectado
          </span>
        </header>

        <div className={styles.mainContent}>
          <div className={styles.sectionHeading}>
            <div>
              <div className={styles.sectionTitle}>
                <i className={config.icon} aria-hidden="true" />
                <h2>{config.label}</h2>
              </div>
              <p>Consulte, crie e atualize o conteúdo publicado no site.</p>
            </div>
            <button
              type="button"
              className={styles.primaryButton}
              onClick={() => {
                setEditorRecord(undefined);
                setEditorOpen(true);
              }}
            >
              <i className="pi pi-plus" aria-hidden="true" />
              Novo registro
            </button>
          </div>

          <div className={styles.toolbar}>
            <label className={styles.searchBox}>
              <i className="pi pi-search" aria-hidden="true" />
              <input
                type="search"
                placeholder={`Buscar em ${config.label.toLocaleLowerCase()}...`}
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </label>
            <span className={styles.recordCount}>
              {loading
                ? "Carregando..."
                : `${filteredRecords.length} registros`}
            </span>
          </div>

          {notice && (
            <div className={styles.successMessage} role="status">
              <i className="pi pi-check-circle" aria-hidden="true" />
              {notice}
            </div>
          )}
          {loadError && (
            <div className={styles.loadError} role="alert">
              <i className="pi pi-exclamation-circle" aria-hidden="true" />
              <span>{loadError}</span>
              <button
                type="button"
                onClick={() => setRefreshKey((current) => current + 1)}
              >
                Tentar novamente
              </button>
            </div>
          )}

          {loading ? (
            <div className={styles.emptyState}>
              <i className="pi pi-spin pi-spinner" aria-hidden="true" />
              <p>Carregando conteúdo...</p>
            </div>
          ) : !loadError && filteredRecords.length === 0 ? (
            <div className={styles.emptyState}>
              <span className={styles.emptyIcon}>
                <i className={config.icon} aria-hidden="true" />
              </span>
              <h3>
                {search
                  ? "Nenhum resultado encontrado"
                  : "Ainda não há registros"}
              </h3>
              <p>
                {search
                  ? "Tente buscar por outro termo."
                  : "Crie o primeiro registro desta seção para começar."}
              </p>
              {!search && (
                <button
                  type="button"
                  className={styles.secondaryButton}
                  onClick={() => {
                    setEditorRecord(undefined);
                    setEditorOpen(true);
                  }}
                >
                  <i className="pi pi-plus" aria-hidden="true" /> Criar registro
                </button>
              )}
            </div>
          ) : (
            <div className={styles.recordGrid}>
              {filteredRecords.map((record) => {
                const title = getRecordTitle(record);
                const files = config.fields
                  .filter(
                    (field) => field.type === "file" || field.type === "files",
                  )
                  .flatMap((field) => fileNamesFor(record, field.name));
                const date = record.data
                  ? new Date(record.data).toLocaleDateString("pt-BR")
                  : null;
                const metadata =
                  record.sumario ||
                  record.resposta ||
                  record.identificador ||
                  record.url ||
                  record.descricao ||
                  (record.modalidades
                    ? `${record.modalidades.length} modalidades`
                    : null);

                return (
                  <article className={styles.recordCard} key={record.id}>
                    {files.length > 0 ? (
                      <img
                        className={styles.recordImage}
                        src={pocketbase.files.getURL(record, files[0])}
                        alt=""
                      />
                    ) : (
                      <div className={styles.recordImagePlaceholder}>
                        <i className={config.icon} aria-hidden="true" />
                      </div>
                    )}
                    <div className={styles.recordBody}>
                      <div className={styles.recordMeta}>
                        <span>{config.label}</span>
                        {date && <time>{date}</time>}
                      </div>
                      <h3>{title || record.id}</h3>
                      {metadata && (
                        <p className={styles.recordDescription}>{metadata}</p>
                      )}
                      {files.length > 0 && (
                        <span className={styles.attachmentCount}>
                          <i className="pi pi-images" aria-hidden="true" />
                          {files.length}{" "}
                          {files.length === 1 ? "imagem" : "imagens"}
                        </span>
                      )}
                      <div className={styles.recordActions}>
                        <button
                          type="button"
                          className={styles.editButton}
                          onClick={() => {
                            setEditorRecord(record);
                            setEditorOpen(true);
                          }}
                        >
                          <i className="pi pi-pencil" aria-hidden="true" />
                          Editar
                        </button>
                        <button
                          type="button"
                          className={styles.deleteButton}
                          onClick={() => deleteRecord(record)}
                          aria-label={`Excluir ${title}`}
                        >
                          <i className="pi pi-trash" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {editorOpen && (
        <RecordEditor
          key={`${activeCollection}-${editorRecord?.id || "new"}`}
          config={config}
          record={editorRecord}
          onClose={() => setEditorOpen(false)}
          onSaved={(message) => {
            setEditorOpen(false);
            setRefreshKey((current) => current + 1);
            setNotice(message);
          }}
        />
      )}
    </main>
  );
}

export default Admin;
