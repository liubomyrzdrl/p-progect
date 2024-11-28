import { RouteShorthandOptions } from "fastify";

import { $ref } from "./user.schema";

export const getUserOpts: RouteShorthandOptions = {
    schema:{
        response: {
            200: $ref('getUserResponseSchema'),
            404: {
                type: 'object',
                properties: {
                    statusCode: { type: 'integer' },
                    message: { type: 'string' },
                },
            }},
    }
};