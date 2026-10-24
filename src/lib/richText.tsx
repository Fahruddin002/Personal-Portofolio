import { ReactNode } from "react";

/**
 * Ubah penanda rich-text menjadi elemen React:
 *   **teks**  -> <strong> (tebal, warna text-primary)
 *   `teks`    -> <code>  (inline-code, tint primary-blue)
 */
export function parseRich(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  const regex = /\*\*([^*]+)\*\*|`([^`]+)`/g;
  let last = 0;
  let key = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > last) {
      nodes.push(text.slice(last, match.index));
    }
    if (match[1] !== undefined) {
      nodes.push(
        <strong key={key++} className="font-bold text-text-primary">
          {match[1]}
        </strong>
      );
    } else if (match[2] !== undefined) {
      nodes.push(
        <code
          key={key++}
          className="rounded-md bg-primary-blue/10 px-1.5 py-0.5 font-mono text-[0.85em] text-primary-blue"
        >
          {match[2]}
        </code>
      );
    }
    last = match.index + match[0].length;
  }

  if (last < text.length) {
    nodes.push(text.slice(last));
  }
  return nodes;
}
