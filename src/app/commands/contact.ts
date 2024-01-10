// commands/contact.ts

export type ContactCommandState = 'NAME' | 'EMAIL' | 'MESSAGE' | 'CONFIRMATION' | 'IDLE';

export const contactCommand = (
    input: string,
    currentState: ContactCommandState,
    setState: React.Dispatch<React.SetStateAction<ContactCommandState>>
): string => {
    let output = '';

    switch (currentState) {
        case 'IDLE':
            setState('NAME');
            output = 'Please enter your name:';
            break;
        case 'NAME':
            // Save name logic here
            setState('EMAIL');
            output = 'Please enter your email:';
            break;
        case 'EMAIL':
            // Save email logic here
            setState('MESSAGE');
            output = 'Please enter your message:';
            break;
        case 'MESSAGE':
            // Save message logic here
            setState('CONFIRMATION');
            output = 'Press "y" to send your message.';
            break;
        case 'CONFIRMATION':
            if (input.trim().toLowerCase() === 'y') {
                // Process and send the message logic here
                output = 'Message sent! Thank you for reaching out.';
            } else {
                output = 'Message canceled.';
            }
            setState('IDLE'); // Reset the state to IDLE after completion or cancellation
            break;
        // No default case needed since all possible values of currentState are covered
    }

    return output;
};
