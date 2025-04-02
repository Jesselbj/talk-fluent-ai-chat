
import React, { useState, useRef, useEffect } from 'react';
import { QrCode, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { scanQrCode } from '@/utils/translationService';

interface QRCodeScannerProps {
  onScanComplete: (userId: string) => void;
}

const QRCodeScanner: React.FC<QRCodeScannerProps> = ({ onScanComplete }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const startScanner = async () => {
    setScanning(true);
    setError(null);
    
    try {
      // In a real app, we would use the camera to scan QR codes
      // For this mock, we'll just simulate a scan after a delay
      const userId = await scanQrCode();
      onScanComplete(userId);
      setIsOpen(false);
    } catch (err) {
      setError('扫描失败，请重试');
    } finally {
      setScanning(false);
    }
  };

  const handleOpen = () => {
    setIsOpen(true);
    setError(null);
  };

  useEffect(() => {
    if (isOpen) {
      startScanner();
    }
  }, [isOpen]);

  return (
    <>
      <Button 
        variant="outline" 
        size="icon" 
        onClick={handleOpen} 
        className="rounded-full h-12 w-12 border-gray-300 hover:bg-gray-100"
      >
        <QrCode className="h-6 w-6 text-gray-600" />
      </Button>
      
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">扫描二维码</DialogTitle>
          </DialogHeader>
          
          <div className="flex flex-col items-center justify-center p-6">
            <div className="relative w-64 h-64 bg-black rounded-lg overflow-hidden mb-4">
              {scanning ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-48 h-48 border-4 border-white opacity-70 relative">
                    <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-primary"></div>
                    <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-primary"></div>
                    <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-primary"></div>
                    <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-primary"></div>
                    
                    {/* Scanner line animation */}
                    <div className="absolute top-0 left-0 right-0 h-0.5 bg-primary animate-pulse-subtle" 
                         style={{
                           animation: 'translateY(0) 2s infinite linear',
                           top: '50%'
                         }}></div>
                  </div>
                </div>
              ) : null}
              
              <video ref={videoRef} className="w-full h-full object-cover" hidden></video>
              <canvas ref={canvasRef} className="w-full h-full object-cover" hidden></canvas>
            </div>
            
            {error && <p className="text-sm text-destructive mt-2">{error}</p>}
            
            <p className="text-sm text-gray-500 text-center mt-2 mb-4">
              {scanning ? '扫描中...' : '将二维码对准框内以完成扫描'}
            </p>
            
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setIsOpen(false)}>
                取消
              </Button>
              {!scanning && (
                <Button onClick={startScanner} disabled={scanning}>
                  重新扫描
                </Button>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default QRCodeScanner;
