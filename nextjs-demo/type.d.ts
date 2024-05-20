export type ResponseSuccess<T> = {
    data: {
        message: string;
        metadata: T;
        statusCode: number;
    };
};

export type ResponseError = {
    response: {
        data: {
            message: string;
            statusCode: number;
        };
    };
};
