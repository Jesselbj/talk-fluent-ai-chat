
// Add type definition for SpeechRecognition
interface Window {
  SpeechRecognition: any;
  webkitSpeechRecognition: any;
}

const mockTranslate = async (text: string, targetLang: string): Promise<string> => {
  // This is a mock translation service
  // In a real app, you would connect to a translation API like Google Translate, DeepL, etc.
  
  // For demo purposes, we'll just add a tag to show it was "translated"
  const mockTranslations: Record<string, Record<string, string>> = {
    'en': {
      'Hello': '你好',
      'How are you?': '你好吗？',
      'I\'m fine, thank you': '我很好，谢谢',
      'Nice to meet you': '很高兴认识你',
      'Thank you': '谢谢',
      'What\'s your name?': '你叫什么名字？',
      'My name is': '我的名字是',
      'Where are you from?': '你从哪里来？',
      'I am from': '我来自'
    },
    'zh': {
      '你好': 'Hello',
      '你好吗？': 'How are you?',
      '我很好，谢谢': 'I\'m fine, thank you',
      '很高兴认识你': 'Nice to meet you',
      '谢谢': 'Thank you',
      '你叫什么名字？': 'What\'s your name?',
      '我的名字是': 'My name is',
      '你从哪里来？': 'Where are you from?',
      '我来自': 'I am from'
    }
  };

  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));

  // For English to Chinese or Chinese to English we have mock translations
  if ((targetLang === 'zh' && mockTranslations['en'][text]) || 
      (targetLang === 'en' && mockTranslations['zh'][text])) {
    const sourceLang = targetLang === 'zh' ? 'en' : 'zh';
    return mockTranslations[sourceLang][text] || `[${targetLang}] ${text}`;
  }

  // For other cases, we just return the text with a language prefix
  return `[${targetLang}] ${text}`;
};

// Detect language - mock implementation
export const detectLanguage = async (text: string): Promise<string> => {
  // In a real app, you would use a service like Google Cloud's Language Detection API
  // This is just a basic mock
  if (/[\u4e00-\u9fa5]/.test(text)) {
    return 'zh'; // Chinese
  } else if (/[а-яА-Я]/.test(text)) {
    return 'ru'; // Russian
  } else if (/[가-힣]/.test(text)) {
    return 'ko'; // Korean
  } else if (/[ぁ-んァ-ン]/.test(text)) {
    return 'ja'; // Japanese
  } else {
    return 'en'; // Default to English
  }
};

// Translate text
export const translateText = async (text: string, targetLang: string): Promise<string> => {
  return mockTranslate(text, targetLang);
};

// Text-to-speech - mock implementation
export const speakText = (text: string, lang: string) => {
  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang === 'zh' ? 'zh-CN' : 'en-US'; // Simplified default mapping
    utterance.rate = 1.0;
    window.speechSynthesis.speak(utterance);
  }
};

// Mock speech recognition
let isListening = false;
let recognitionInstance: any = null;

export const startListening = (
  onResult: (text: string) => void,
  onEnd: () => void,
  language: string = 'en-US'
) => {
  if (isListening) return;
  
  isListening = true;
  
  // Check if browser supports SpeechRecognition
  const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
  
  if (SpeechRecognition) {
    recognitionInstance = new SpeechRecognition();
    recognitionInstance.continuous = true;
    recognitionInstance.interimResults = true;
    recognitionInstance.lang = language;
    
    recognitionInstance.onresult = (event: any) => {
      const transcript = Array.from(event.results)
        .map((result: any) => result[0])
        .map((result: any) => result.transcript)
        .join('');
      
      onResult(transcript);
    };
    
    recognitionInstance.onend = () => {
      isListening = false;
      onEnd();
    };
    
    recognitionInstance.start();
  } else {
    console.error('Speech recognition not supported in this browser');
    onEnd();
  }
};

export const stopListening = () => {
  if (recognitionInstance) {
    recognitionInstance.stop();
    isListening = false;
  }
};

// Mock QR code scanning
export const scanQrCode = async (): Promise<string> => {
  // In a real app, you would use a library like @zxing/browser
  // This is just a mock
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('user_1234567890'); // Simulated user ID from QR code
    }, 1500);
  });
};

// Helper to determine if we're on mobile
export const isMobile = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};
