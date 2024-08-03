export const authDetails = {
    signup: {
        title: "Join Us!",
        subtitle: "be part of something amazing! Let's innovate and create together.",
        buttonText: "Continue",
        fields: [
            {
                type: "input",
                specifier: null,
                placeholder: "Username",
                validation: null
            },
            {
                type: "input",
                specifier: "password",
                placeholder: "Password",
                validation: null
            },
            {
                type: "input",
                specifier: null,
                placeholder: "Email",
                validation: "^[^@]+@[^@]+\.[^@]+$",
                validationMessage: "Please provide a proper email."
            },
            {
                type: "input",
                specifier: null,
                placeholder: "Phone",
                validation: " ^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$",
                validationMessage: "Please provide a proper phone number"
            }
        ]
    },
    login: {
        title: "Welcome Back!",
        subtitle: "We're excited to have you with us again. Let's achieve great things together!",
        buttonText: "Continue",
        fields: [
            {
                type: "input",
                specifier: null,
                placeholder: "Username",
                validation: null
            },
            {
                type: "input",
                specifier: "password",
                placeholder: "Password",
                validation: null
            },
        ]
    }
}