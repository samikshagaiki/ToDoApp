const { NlpManager } = require('node-nlp');

async function setupChatbot() {
    try {
        const manager = new NlpManager({ languages: ['en'] });

        // Add training data
        manager.addDocument('en', 'hello', 'greetings');
        manager.addDocument('en', 'hi', 'greetings');
        manager.addDocument('en', 'hey', 'greetings');
        manager.addDocument('en', 'good morning', 'greetings');
        manager.addDocument('en', 'good afternoon', 'greetings');
        manager.addDocument('en', 'good evening', 'greetings');

        manager.addDocument('en', 'create task', 'task.create');
        manager.addDocument('en', 'add task', 'task.create');
        manager.addDocument('en', 'new task', 'task.create');
        manager.addDocument('en', 'make task', 'task.create');

        manager.addDocument('en', 'show tasks', 'task.list');
        manager.addDocument('en', 'list tasks', 'task.list');
        manager.addDocument('en', 'my tasks', 'task.list');
        manager.addDocument('en', 'view tasks', 'task.list');

        manager.addDocument('en', 'help', 'help');
        manager.addDocument('en', 'what can you do', 'help');
        manager.addDocument('en', 'commands', 'help');

        manager.addDocument('en', 'bye', 'goodbye');
        manager.addDocument('en', 'goodbye', 'goodbye');
        manager.addDocument('en', 'see you later', 'goodbye');

        // Add responses
        manager.addAnswer('en', 'greetings', 'Hello! How can I help you with your tasks today?');
        manager.addAnswer('en', 'greetings', 'Hi there! What can I do for you?');
        manager.addAnswer('en', 'greetings', 'Hey! Ready to be productive?');

        manager.addAnswer('en', 'task.create', 'I can help you create a task! What would you like to add to your todo list?');
        manager.addAnswer('en', 'task.list', 'You can view your tasks in the main app. Would you like me to help you with anything else?');
        
        manager.addAnswer('en', 'help', 'I can help you with: creating tasks, viewing tasks, and general questions about your todo app!');
        
        manager.addAnswer('en', 'goodbye', 'Goodbye! Have a productive day!');
        manager.addAnswer('en', 'goodbye', 'See you later! Don\'t forget to complete your tasks!');

        // Train the model
        console.log('Training chatbot...');
        await manager.train();
        manager.save();
        console.log('Chatbot training completed!');

        return manager;
    } catch (error) {
        console.error('Error setting up chatbot:', error);
        throw error;
    }
}

module.exports = { setupChatbot };