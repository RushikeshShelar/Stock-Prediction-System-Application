// Toggle chatbot visibility
function toggleChatbot() {
    const container = document.querySelector('.chatbot-container');
    const isMinimized = container.style.height === '80px';
    
    if (isMinimized) {
        container.style.height = '600px';
        document.querySelector('.minimize-btn i').className = 'fas fa-minus';
    } else {
        container.style.height = '80px';
        document.querySelector('.minimize-btn i').className = 'fas fa-plus';
    }
}

// Send message to backend
function sendMessage() {
    const input = document.getElementById('chat-input');
    const message = input.value.trim();
    
    if (!message) return;
    
    addMessage('user', message);
    input.value = '';
    
    const typingIndicator = document.getElementById('typing-indicator');
    typingIndicator.style.display = 'flex';
    
    // API call to your backend
    fetch('/chatbot/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `query=${encodeURIComponent(message)}`
    })
    .then(response => response.json())
    .then(data => {
        typingIndicator.style.display = 'none';
        addMessage('bot', data.response);
    })
    .catch(error => {
        typingIndicator.style.display = 'none';
        addMessage('bot', 'Sorry, I encountered an error. Please try again.');
        console.error('Error:', error);
    });
}

// Add message to chat
function addMessage(type, text) {
    const chatbox = document.getElementById('chatbox');
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${type}`;
    
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    const content = type === 'bot' 
        ? `<div class="message-content">
               <i class="fas fa-robot bot-icon"></i>
               <div class="message-text">${text}</div>
           </div>`
        : `<div class="message-content">
               <div class="message-text">${text}</div>
           </div>`;
               
    messageDiv.innerHTML = content + `<div class="timestamp">${timestamp}</div>`;
    chatbox.appendChild(messageDiv);
    chatbox.scrollTop = chatbox.scrollHeight;
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Enter key support
    document.getElementById('chat-input').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    // Disable send button when input is empty
    document.getElementById('chat-input').addEventListener('input', function(e) {
        document.getElementById('send-button').disabled = !e.target.value.trim();
    });
});