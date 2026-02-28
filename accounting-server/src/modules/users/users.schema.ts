import z from 'zod';

export const getUsersSchema = z.object({

});

export const createUsersSchema = z.object({
  body: z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    roleId: z.coerce.bigint()
  })
});

export const updateUsersSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    email: z.string().email().optional(),
    password: z.string().min(6).optional(),
    roleId: z.coerce.bigint().optional()
  })
});

export const userIdParamsSchema = z.object({
  body: z.object({
    id: z.coerce.bigint()
  }),
});

export type CreateUsersInput = z.infer<typeof createUsersSchema>['body'];
export type UpdateUsersInput = z.infer<typeof updateUsersSchema>['body'];
export type UserIdParams = z.infer<typeof userIdParamsSchema>['body'];