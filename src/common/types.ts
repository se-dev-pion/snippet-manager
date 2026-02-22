import z from 'zod';

export const snippetConfigSchema = z.object({
    root: z.object({
        name: z.string(),
        item: z.array(
            z.object({
                scope: z.string(),
                key: z.string(),
                tip: z.string(),
                main: z.string()
            })
        )
    })
});

export type SnippetConfig = z.infer<typeof snippetConfigSchema>;
