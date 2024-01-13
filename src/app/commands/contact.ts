type ContactFormData = {
    contactname: string;
    email: string;
    message: string;
};

export type ContactCommandState = 'NAME' | 'EMAIL' | 'MESSAGE' | 'CONFIRMATION' | 'IDLE';

let formData: ContactFormData = {
    contactname: '',
    email: '',
    message: ''
};

export const contactCommand = (
    input: string,
    currentState: ContactCommandState,
    setState: React.Dispatch<React.SetStateAction<ContactCommandState>>,
    updateTerminalHistory: (message: string) => void
): string => {
    let output = '';

    switch (currentState) {
        case 'IDLE':
            setState('NAME');
            output = 'Please enter your name:';
            break;
        case 'NAME':
            formData.contactname = input;
            setState('EMAIL');
            output = 'Please enter your email:';
            break;
        case 'EMAIL':
            formData.email = input;
            setState('MESSAGE');
            output = 'Please enter your message:';
            break;
        case 'MESSAGE':
            formData.message = input;
            setState('CONFIRMATION');
            output = 'Press "y" to send your message.';
            break;
        case 'CONFIRMATION':
            if (input.trim().toLowerCase() === 'y') {
                sendContactForm(formData, updateTerminalHistory);
                output = 'Sending message...';
                setState('IDLE'); // Reset the state to IDLE
            } else {
                output = 'Message canceled.';
                setState('IDLE'); // Reset the state to IDLE
            }
            break;
    }

    return output;
};

const sendContactForm = async (data: ContactFormData, callback: (message: string) => void) => {
    try {
        const response = await fetch('https://formspree.io/f/xgedrjkp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            callback('Message sent successfully.');
        } else {
            callback('Error sending message.');
        }
    } catch (error) {
        callback(`Error: ${error}`);
    }
};
