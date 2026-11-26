/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { requirePerm } from "@/lib/auth";
import { RES, type Field } from "@/lib/resources";
import { save, remove } from "./actions";
import {
  ActionLink,
  Button,
  Checkbox,
  ConfirmDelete,
  EmptyState,
  Input,
  PageHeader,
  Select,
  StatusPill,
  Textarea,
} from "@/components/admin/AdminUI";

function columnTitle(key: string) {
  return key
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export default async function Resource({
  params,
  searchParams,
}: {
  params: Promise<{ res: string }>;
  searchParams: Promise<{ edit?: string; new?: string }>;
}) {
  const { res } = await params;
  const query = await searchParams;
  const cfg = RES[res];
  if (!cfg) notFound();

  await requirePerm(cfg.perm);
  const rows: any[] = await (db as any)[cfg.model].findMany({
    include: cfg.rel ? { [cfg.rel]: true } : undefined,
    orderBy: { id: "desc" },
    take: 200,
  });
  const row = query.edit ? rows.find((item) => item.id === query.edit) : null;
  const editing = !!row || !!query.new;

  const value = (field: Field) =>
    field.type === "lines"
      ? field.show
        ? field.show(row)
        : (row?.[cfg.rel!] ?? []).map((item: any) => item.text).join("\n")
      : field.type === "csv"
        ? (row?.[field.name] ?? []).join(", ")
        : field.type === "date"
          ? row?.[field.name]?.toISOString().slice(0, 10) ?? ""
          : field.type === "password"
            ? ""
            : row?.[field.name] ?? "";

  return (
    <main>
      <PageHeader
        title={cfg.title}
        description={`Manage ${cfg.title.toLowerCase()} and keep the website content up to date.`}
        action={<ActionLink href={`/admin/${res}?new=1`}>Add new</ActionLink>}
      />

      {editing && (
        <form action={save} className="admin-resource-form">
          <input type="hidden" name="_res" value={res} />
          <input type="hidden" name="_id" value={row?.id ?? ""} />
          {cfg.fields.map((field) => (
            <label key={field.name}>
              <span>
                {field.label}
                {field.required && <span className="admin-required" aria-label="required"> *</span>}
              </span>
              {field.type === "textarea" || field.type === "lines" ? (
                <Textarea
                  name={field.name}
                  rows={field.type === "lines" ? 5 : 4}
                  defaultValue={value(field)}
                  className={field.type === "lines" ? "admin-monospace" : undefined}
                />
              ) : field.type === "checkbox" ? (
                <Checkbox
                  type="checkbox"
                  name={field.name}
                  defaultChecked={
                    row
                      ? !!row[field.name]
                      : field.name !== "recommended" &&
                        field.name !== "featured" &&
                        field.name !== "demo" &&
                        field.name !== "startingFrom"
                  }
                />
              ) : field.type === "image" ? (
                <div className="admin-cover-image-field">
                  <Input
                        name={field.name}
                        type="url"
                        defaultValue={value(field)}
                        placeholder="https://example.com/image.jpg"
                  />
                  {row?.[field.name] && (
                        <img
                          className="admin-cover-image-preview"
                          src={row[field.name]}
                          alt={`Current ${field.label.toLowerCase()}`}
                        />
                  )}
                  <div className="admin-cover-file-picker">
                        <input
                          type="file"
                          name="coverImageFile"
                          accept="image/jpeg,image/png,image/webp"
                          aria-label={`Choose ${field.label.toLowerCase()} from this computer`}
                        />
                        <span>Choose an image from this computer. It uploads when you save.</span>
                  </div>
                </div>
              ) : field.type === "select" ? (
                <Select name={field.name} defaultValue={value(field)}>
                  {field.options!.map((option) => <option key={option}>{option}</option>)}
                </Select>
              ) : (
                <Input
                  name={field.name}
                  type={
                    field.type === "number" || field.type === "date" || field.type === "password"
                      ? field.type
                      : "text"
                  }
                  defaultValue={value(field)}
                  required={field.required}
                />
              )}
            </label>
          ))}
          <div className="admin-resource-savebar">
            <Button type="submit">Save changes</Button>
            <Link className="admin-secondary-button" href={`/admin/${res}`}>Cancel</Link>
          </div>
        </form>
      )}

      <section className="admin-resource-list">
        <h3>{editing ? "All records" : cfg.title}</h3>
        {rows.length === 0 ? (
          <EmptyState title={`No ${cfg.title.toLowerCase()} yet`}>
            Add a record to get started.
          </EmptyState>
        ) : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  {cfg.list.map((key) => <th key={key}>{columnTitle(key)}</th>)}
                  <th className="admin-table-action">Actions</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((item) => (
                  <tr key={item.id}>
                    {cfg.list.map((key) => (
                      <td key={key}>
                        {key === "status" ? (
                          <StatusPill status={String(item[key] ?? "Unknown")} />
                        ) : (
                          String(item[key] ?? "—")
                        )}
                      </td>
                    ))}
                    <td className="admin-table-action">
                      <div className="admin-row-actions">
                        <Link href={`/admin/${res}?edit=${item.id}`}>Edit</Link>
                        <ConfirmDelete action={remove} resource={res} id={item.id} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
}
