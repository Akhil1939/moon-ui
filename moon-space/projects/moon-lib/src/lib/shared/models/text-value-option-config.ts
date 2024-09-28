/**
 * Configuration options for a text-value pair.
 * 
 * Required properties:
 * - text
 * - value
 */
export interface TextValueOptionConfig {
    /**
     * Text to display.
     */
    text: string;

    /**
     * Value associated with the text.
     */
    value: number | string;
}
