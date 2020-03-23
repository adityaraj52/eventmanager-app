export const DATABASE_TABLES = {
    USER_PROFILE: "USER_PROFILE",
    EVENT_INFO: "EVENT_INFO",
    USER_TRANSACTIONS: "USER_TRANSACTIONS",
    EVENT_POLL: "EVENT_POLL"
};

export const FormInputType = {
    CHECKBOX: 'checkbox',
    TEXT: 'text',
    TEXTAREA: 'textarea',
    EMAIL: 'email',
    NUMBER: 'number',
    TIME: 'time',
    DATE: 'date',
}

export const EMPTY_ELEMENT = 'EMPTY_ELEMENT';

export const USER_PROFILE_FIELDS = {
    DISPLAY_NAME: "displayName",
    EMAIL: "email",
    PHONE: "phone",
    PHOTO: "photo",
    WHATSAPP: "",
    SKYPE: "",
    DOB: "",
    WALLET_CREDITS: "walletCredits",
    EVENT_INTERESTED: "eventInterested",
    PREVIOUS_EVENTS: "previousEvents"
};

export const EVENT_INFO_FIELDS = {
    EVENT_SLOT: "eventSlot",
    EVENT_ID: "eventId",
    EVENT_DATE: "eventDate",
    EVENT_TYPE: "eventType",
    EVENT_PARTICIPANTS: "eventParticapant",
    EVENT_LOCATION: "eventLocation",
    EVENT_ORGANISER: "eventOrganiser",
    EVENT_COST: "eventCost",
    EVENT_URL: "eventUrl",
    EVENT_DETAILS: "eventDetails",
    EVENT_PRIORITY: "eventPriority"
};

export const style = {
    hrStyle: {
        display: 'block',
        marginTop: '0.5em',
        marginBottom: '0.5em',
        marginLeft: 'auto',
        marginRight: 'auto',
        borderStyle: 'inset',
        borderWidth: '1px',
        borderColor: 'gray'
    }
};