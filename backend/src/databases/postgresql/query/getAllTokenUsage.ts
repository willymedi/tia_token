

export const getAllTokenUsage =  `
    SELECT
        tu.id AS token_usage_id,
        tu.used_at AS token_usage_used_at,
        u.id AS user_id,
        u.username AS user_username,
        t.id AS token_id,
        t.token_value AS token_value
    FROM
        "tokenusage" tu
    JOIN
        "users" u ON tu.used_by = u.id
    JOIN
        "token" t ON tu.token_id = t.id
    WHERE
        tu.used_by = $1
    `;