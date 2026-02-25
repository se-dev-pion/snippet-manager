import z from 'zod';

const snippetConfigItemSchema = z.object({
    key: z.string(),
    tip: z.string(),
    main: z.object({
        '@_language': z.string(),
        '#text': z.string()
    })
});

export type SnippetConfigItem = z.infer<typeof snippetConfigItemSchema>;

export const snippetConfigSchema = z.object({
    root: z.object({
        name: z.string(),
        item: z.union([snippetConfigItemSchema, z.array(snippetConfigItemSchema)]).optional()
    })
});

export type SnippetConfig = z.infer<typeof snippetConfigSchema>;
