import z from 'zod';

export const snippetConfigSchema = z.object({
    root: z.object({
        name: z.string(),
        item: z.array(
            z.object({
                key: z.string(),
                tip: z.string(),
                main: z.object({
                    '@_scope': z.string(),
                    '#text': z.string()
                })
            })
        )
    })
});
