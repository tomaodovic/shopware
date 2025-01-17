import template from './sw-text-field-deprecated.html.twig';

const { Component, Mixin } = Shopware;

/**
 * @package admin
 *
 * @private
 * @description Simple text field.
 * @status ready
 * @example-type dynamic
 * @component-example
 * <sw-text-field label="Name" placeholder="placeholder goes here..."></sw-text-field>
 */
Component.register('sw-text-field-deprecated', {
    template,
    inheritAttrs: false,

    emits: ['update:value'],

    inject: ['feature'],

    mixins: [
        Mixin.getByName('sw-form-field'),
        Mixin.getByName('remove-api-error'),
        Mixin.getByName('validation'),
    ],

    props: {
        // FIXME: add type and default value to property
        // eslint-disable-next-line vue/require-prop-types, vue/require-default-prop
        value: {
            required: false,
        },

        placeholder: {
            type: String,
            required: false,
            default: '',
        },

        copyable: {
            type: Boolean,
            required: false,
            default: false,
        },

        copyableTooltip: {
            type: Boolean,
            required: false,
            default: false,
        },

        idSuffix: {
            type: String,
            required: false,
            default() {
                return '';
            },
        },
    },

    data() {
        return {
            currentValue: this.value,
        };
    },

    computed: {
        hasPrefix() {
            return this.$scopedSlots.hasOwnProperty('prefix');
        },

        hasSuffix() {
            return this.$scopedSlots.hasOwnProperty('suffix');
        },

        additionalListeners() {
            const additionalListeners = { ...this.$listeners };

            delete additionalListeners.input;
            delete additionalListeners.change;

            return additionalListeners;
        },
    },

    watch: {
        value(value) {
            this.currentValue = value;
        },
    },

    methods: {
        onChange(event) {
            this.$emit('update:value', event.target.value || '');
        },

        onInput(event) {
            this.$emit('update:value', event.target.value);
        },

        restoreInheritance() {
            this.$emit('update:value', null);
        },

        createInputId(identification) {
            if (!this.idSuffix || this.idSuffix.length <= 0) {
                return identification;
            }

            return `${identification}-${this.idSuffix}`;
        },
    },
});
