export class CustomDatePipeOptions {
    /**
     * @description To get date without timezone
     * @example "2023-01-01T00:00:00+02:00" to "2023-01-01T00:00:00"
     */
    withoutPlus = false;
    dateFormat = "MM/DD/YYYY";
}