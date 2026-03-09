/**
 * TIN (Tax Identification Number) Validator
 * Supports UK/US TIN formats:
 * - US SSN: XXX-XX-XXXX (9 digits)
 * - US EIN: XX-XXXXXXX (9 digits)
 * - UK UTR: XXXXX XXXXXX (10 digits)
 * - UK NI Number: AA 12 34 56 A format
 */

/**
 * Clean TIN by removing all non-numeric characters (except letters for UK NI)
 */
export const cleanTIN = (tin: string): string => {
    // Keep letters for UK NI Number validation
    return tin.replace(/[^A-Za-z0-9]/g, '').toUpperCase();
};

/**
 * Format TIN - FLEKSIBEL, tidak terlalu strict
 */
export const formatTIN = (tin: string): string => {
    const cleaned = cleanTIN(tin);
    
    if (cleaned.length === 0) return '';
    
    // FLEKSIBEL: Format berdasarkan panjang, tidak strict
    if (cleaned.length >= 9 && /^\d+$/.test(cleaned)) {
        // Format umum: XXX-XX-XXXX untuk 9 digit
        if (cleaned.length === 9) {
            return `${cleaned.substring(0, 3)}-${cleaned.substring(3, 5)}-${cleaned.substring(5)}`;
        }
        // Format umum: XXX-XXX-XXXX untuk 10 digit
        else if (cleaned.length === 10) {
            return `${cleaned.substring(0, 3)}-${cleaned.substring(3, 6)}-${cleaned.substring(6)}`;
        }
        // Format umum: XXXXX XXXXXX untuk 11+ digit
        else if (cleaned.length > 10) {
            const mid = Math.floor(cleaned.length / 2);
            return `${cleaned.substring(0, mid)} ${cleaned.substring(mid)}`;
        }
    } else if (/^[A-Z0-9]+$/.test(cleaned)) {
        // Format alphanumeric: tambahkan spasi setiap 4 karakter
        return cleaned.replace(/(.{4})/g, '$1 ').trim();
    }
    
    return cleaned;
};

/**
 * Validate TIN - supports UK/US formats (FLEKSIBEL)
 * @returns object with isValid boolean and errorMessage string
 */
export const validateTIN = (tin: string): { isValid: boolean; errorMessage: string } => {
    const tinValue = tin.trim().toUpperCase();
    
    // Check if TIN is empty
    if (!tinValue) {
        return { isValid: false, errorMessage: 'TIN is required' };
    }

    // Remove formatting characters for validation
    const cleanTINValue = cleanTIN(tinValue);
    
    // FLEKSIBEL: Terima angka apa saja, minimal 6 digit
    if (cleanTINValue.length < 6) {
        return { isValid: false, errorMessage: 'TIN minimal 6 angka' };
    }
    
    // FLEKSIBEL: Maksimal 15 digit untuk nomor pajak internasional
    if (cleanTINValue.length > 15) {
        return { isValid: false, errorMessage: 'TIN maksimal 15 digit' };
    }

    // FLEKSIBEL: Terima hanya angka (paling umum)
    if (/^\d+$/.test(cleanTINValue)) {
        return { isValid: true, errorMessage: '' };
    }
    
    // FLEKSIBEL: Terima kombinasi huruf dan angka untuk format internasional
    if (/^[A-Z0-9]+$/.test(cleanTINValue)) {
        return { isValid: true, errorMessage: '' };
    }

    return { 
        isValid: false, 
        errorMessage: 'TIN hanya boleh angka atau huruf dan angka' 
    };
};

/**
 * Quick validation check (boolean only)
 */
export const isTINValid = (tin: string): boolean => {
    return validateTIN(tin).isValid;
};
