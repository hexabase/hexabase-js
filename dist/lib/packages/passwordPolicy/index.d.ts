import { HxbAbstract } from '../../../HxbAbstract';
export default class PasswordPolicy extends HxbAbstract {
    expiredDay: number;
    minLength: number;
    lockoutTime: number;
    lockoutCount: number;
    useSameLimit: boolean;
    usePatternCheck: boolean;
    useMinLength: boolean;
    useLockoutTime: boolean;
    useLockoutCount: boolean;
    useLanguageJa: boolean;
    useLanguageEn: boolean;
    useExpiredDay: boolean;
    sameLimit: number;
    patternCheckType: number;
    set(key: string, value: any): PasswordPolicy;
}
