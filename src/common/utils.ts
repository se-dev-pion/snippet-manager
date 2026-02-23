import { XMLParser } from 'fast-xml-parser';
import { ZodType } from 'zod';

export const xmlParser = new XMLParser({
    ignoreAttributes: false
});

interface Deserializer {
    parse(text: string | Uint8Array): any;
}

export function parseWithSchema<D extends Deserializer, S extends ZodType>(
    content: string | Uint8Array,
    deserializer: D,
    schema: S
) {
    const result = deserializer.parse(content);
    return schema.parse(result);
}
