import z from 'zod';

export const snippetConfigItemSchema = z.object({
    key: z.string(),
    tip: z.string(),
    main: z.object({
        '@_language': z.string(),
        '#text': z.string()
    })
});

export const snippetConfigSchema = z.object({
    root: z.object({
        name: z.string(),
        item: z.union([snippetConfigItemSchema, z.array(snippetConfigItemSchema)]).optional()
    })
});
