// commands/contact.ts

type ContactState = 'NAME' | 'EMAIL' | 'MESSAGE' | 'CONFIRMATION' | 'IDLE';
let contactState: ContactState = 'IDLE';

export const contactCommand = (input: string): string => {
    let output = '';

    switch (contactState) {
        case 'IDLE':
            contactState = 'NAME';
            output = 'Please enter your name:';
            break;
        case 'NAME':
            // Save name
            contactState = 'EMAIL';
            output = 'Please enter your email:';
            break;
        case 'EMAIL':
            // Save email
            contactState = 'MESSAGE';
            output = 'Please enter your message:';
            break;
        case 'MESSAGE':
            // Save message
            contactState = 'CONFIRMATION';
            output = 'Press "y" to send your message.';
            break;
        case 'CONFIRMATION':
            if (input.trim().toLowerCase() === 'y') {
                // Process and send the message
                output = 'Message sent! Thank you for reaching out.';
            } else {
                output = 'Message canceled.';
            }
            contactState = 'IDLE';
            break;
        // ... handle other cases
    }

    return output;
};
