
import React, { useState, useEffect } from 'react';
import { Mic, MicOff, StopCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { startListening, stopListening } from '@/utils/translationService';
import { useAppContext } from '@/contexts/AppContext';

interface VoiceRecorderProps {
  onTranscriptReady: (text: string) => void;
}

const VoiceRecorder: React.FC<VoiceRecorderProps> = ({ onTranscriptReady }) => {
  const { isListening, setIsListening, preferredLanguage } = useAppContext();
  const [transcript, setTranscript] = useState('');
  const [recordingTime, setRecordingTime] = useState(0);

  // Map language code to recognition language code
  const getSpeechRecognitionLang = (lang: string): string => {
    const langMap: Record<string, string> = {
      'en': 'en-US',
      'zh': 'zh-CN',
      'es': 'es-ES',
      'fr': 'fr-FR',
      'ja': 'ja-JP',
      'ko': 'ko-KR',
      'ru': 'ru-RU',
      'de': 'de-DE',
      'it': 'it-IT'
    };
    return langMap[lang] || 'en-US';
  };

  useEffect(() => {
    let timerId: number | null = null;
    
    if (isListening) {
      timerId = window.setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } else {
      setRecordingTime(0);
    }
    
    return () => {
      if (timerId !== null) {
        clearInterval(timerId);
      }
    };
  }, [isListening]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleRecording = () => {
    if (isListening) {
      stopListening();
      setIsListening(false);
      if (transcript.trim()) {
        onTranscriptReady(transcript);
      }
      setTranscript('');
    } else {
      setTranscript('');
      setIsListening(true);
      startListening(
        (text) => {
          setTranscript(text);
        },
        () => {
          setIsListening(false);
        },
        getSpeechRecognitionLang(preferredLanguage)
      );
    }
  };

  return (
    <div className="relative flex items-center">
      {isListening && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-white rounded-lg shadow-md px-3 py-1.5 text-sm">
          <div className="flex items-center">
            <span className="relative flex h-3 w-3 mr-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
            <span className="font-medium">{formatTime(recordingTime)}</span>
          </div>
          {transcript && (
            <div className="mt-1 text-xs max-w-[200px] truncate">
              {transcript}
            </div>
          )}
        </div>
      )}
      
      <Button 
        variant={isListening ? "destructive" : "default"}
        size="icon" 
        className={`rounded-full h-12 w-12 ${isListening ? 'bg-red-500 hover:bg-red-600' : ''}`}
        onClick={toggleRecording}
      >
        {isListening ? (
          <StopCircle className="h-6 w-6" />
        ) : (
          <Mic className="h-6 w-6" />
        )}
      </Button>
    </div>
  );
};

export default VoiceRecorder;
