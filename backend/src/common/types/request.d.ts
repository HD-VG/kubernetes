/**
 * Este archivo extiende la interfaz Request de Express.
 * TypeScript usará esta definición para saber que la propiedad
 * 'decryptedData' existe en el objeto req.
 */
declare namespace Express {
    interface DecryptedData {
        query: Record<string, any>;
        params: Record<string, any>;
        body: Record<string, any>;
    }

    export interface Request {
        decryptedData?: DecryptedData; 
    }
}