import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Lightbulb, Thermometer, Wind, Lock, Music, Tv, Coffee, Moon, Sun, Home, Zap, Plus, Trash2, Edit2, Mic, MicOff, Volume2, X, Check } from 'lucide-react';

interface Device {
  id: string;
  name: string;
  icon: any;
  isOn: boolean;
  value?: number;
  unit?: string;
  type: 'toggle' | 'slider' | 'temperature';
  room: string;
}

interface Scene {
  id: string;
  name: string;
  description: string;
  icon: any;
  deviceStates: { deviceId: string; isOn: boolean; value?: number }[];
}

const SmartHomeAI = () => {
  const [devices, setDevices] = useState<Device[]>([
    { id: '1', name: '客厅灯', icon: Lightbulb, isOn: true, room: '客厅', type: 'toggle' },
    { id: '2', name: '卧室灯', icon: Lightbulb, isOn: false, room: '卧室', type: 'toggle' },
    { id: '3', name: '空调', icon: Thermometer, isOn: true, value: 24, unit: '°C', room: '客厅', type: 'temperature' },
    { id: '4', name: '加湿器', icon: Wind, isOn: false, room: '卧室', type: 'toggle' },
    { id: '5', name: '门锁', icon: Lock, isOn: true, room: '大门', type: 'toggle' },
    { id: '6', name: '智能音箱', icon: Music, isOn: true, room: '客厅', type: 'toggle' },
    { id: '7', name: '电视', icon: Tv, isOn: false, room: '客厅', type: 'toggle' },
    { id: '8', name: '咖啡机', icon: Coffee, isOn: false, room: '厨房', type: 'toggle' },
  ]);

  const [scenes, setScenes] = useState<Scene[]>([
    { id: 'home', name: '回家模式', description: '欢迎回家，灯光亮起，空调开启', icon: Home, deviceStates: [
      { deviceId: '1', isOn: true }, { deviceId: '2', isOn: false }, { deviceId: '3', isOn: true, value: 24 },
      { deviceId: '4', isOn: false }, { deviceId: '5', isOn: true }, { deviceId: '6', isOn: true },
      { deviceId: '7', isOn: false }, { deviceId: '8', isOn: false },
    ]},
    { id: 'sleep', name: '睡眠模式', description: '晚安，所有灯光关闭，温度调至舒适', icon: Moon, deviceStates: [
      { deviceId: '1', isOn: false }, { deviceId: '2', isOn: false }, { deviceId: '3', isOn: true, value: 22 },
      { deviceId: '4', isOn: true }, { deviceId: '5', isOn: true }, { deviceId: '6', isOn: false },
      { deviceId: '7', isOn: false }, { deviceId: '8', isOn: false },
    ]},
    { id: 'morning', name: '晨起模式', description: '早安，窗帘拉开，咖啡机启动', icon: Sun, deviceStates: [
      { deviceId: '1', isOn: true }, { deviceId: '2', isOn: true }, { deviceId: '3', isOn: true, value: 25 },
      { deviceId: '4', isOn: false }, { deviceId: '5', isOn: false }, { deviceId: '6', isOn: true },
      { deviceId: '7', isOn: false }, { deviceId: '8', isOn: true },
    ]},
    { id: 'movie', name: '观影模式', description: '灯光调暗，电视开启', icon: Zap, deviceStates: [
      { deviceId: '1', isOn: false }, { deviceId: '2', isOn: false }, { deviceId: '3', isOn: true, value: 23 },
      { deviceId: '4', isOn: false }, { deviceId: '5', isOn: true }, { deviceId: '6', isOn: true },
      { deviceId: '7', isOn: true }, { deviceId: '8', isOn: false },
    ]},
  ]);

  const [currentScene, setCurrentScene] = useState<string>('home');
  const [isProcessing, setIsProcessing] = useState(false);
  const [message, setMessage] = useState('');
  const [showSceneManager, setShowSceneManager] = useState(false);
  const [editingScene, setEditingScene] = useState<Scene | null>(null);
  const [sceneName, setSceneName] = useState('');
  const [sceneDescription, setSceneDescription] = useState('');
  const [selectedDevices, setSelectedDevices] = useState<{ deviceId: string; isOn: boolean; value?: number }[]>([]);

  const [isListening, setIsListening] = useState(false);
  const [voiceInput, setVoiceInput] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'zh-CN';

      recognitionRef.current.onstart = () => setIsListening(true);
      recognitionRef.current.onend = () => setIsListening(false);
      recognitionRef.current.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0])
          .map((result: any) => result.transcript)
          .join('');
        setVoiceInput(transcript);
        if (event.results[0].isFinal) {
          handleVoiceCommand(transcript);
        }
      };
    }
  }, []);

  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'zh-CN';
      utterance.rate = 1;
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      try {
        recognitionRef.current.start();
      } catch (e) {
        setMessage('语音识别不可用，请使用浏览器麦克风权限');
      }
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
    }
  };

  const handleVoiceCommand = (command: string) => {
    setMessage(`识别到指令：${command}`);
    
    const lowerCommand = command.toLowerCase();
    
    if (lowerCommand.includes('打开') || lowerCommand.includes('开启')) {
      if (lowerCommand.includes('灯')) {
        toggleDeviceByName('灯', true);
        speak('好的，已打开灯光');
      } else if (lowerCommand.includes('空调')) {
        toggleDeviceByName('空调', true);
        speak('好的，已打开空调');
      } else if (lowerCommand.includes('电视')) {
        toggleDeviceByName('电视', true);
        speak('好的，已打开电视');
      } else if (lowerCommand.includes('音箱') || lowerCommand.includes('音乐')) {
        toggleDeviceByName('音箱', true);
        speak('好的，已打开智能音箱');
      } else if (lowerCommand.includes('咖啡机')) {
        toggleDeviceByName('咖啡机', true);
        speak('好的，咖啡机已启动');
      }
    } else if (lowerCommand.includes('关闭') || lowerCommand.includes('关掉') || lowerCommand.includes('熄灭')) {
      if (lowerCommand.includes('灯')) {
        toggleDeviceByName('灯', false);
        speak('好的，已关闭灯光');
      } else if (lowerCommand.includes('空调')) {
        toggleDeviceByName('空调', false);
        speak('好的，已关闭空调');
      } else if (lowerCommand.includes('电视')) {
        toggleDeviceByName('电视', false);
        speak('好的，已关闭电视');
      } else if (lowerCommand.includes('音箱') || lowerCommand.includes('音乐')) {
        toggleDeviceByName('音箱', false);
        speak('好的，已关闭智能音箱');
      }
    } else if (lowerCommand.includes('调高') || lowerCommand.includes('升高')) {
      if (lowerCommand.includes('温度')) {
        adjustTemperatureByVoice(+1);
        speak('好的，温度已调高');
      }
    } else if (lowerCommand.includes('调低') || lowerCommand.includes('降低')) {
      if (lowerCommand.includes('温度')) {
        adjustTemperatureByVoice(-1);
        speak('好的，温度已调低');
      }
    } else if (lowerCommand.includes('回家') || lowerCommand.includes('到家')) {
      activateSceneByName('回家');
      speak('欢迎回家！');
    } else if (lowerCommand.includes('睡觉') || lowerCommand.includes('晚安') || lowerCommand.includes('睡眠')) {
      activateSceneByName('睡眠');
      speak('晚安，做个好梦！');
    } else if (lowerCommand.includes('起床') || lowerCommand.includes('早安') || lowerCommand.includes('晨起')) {
      activateSceneByName('晨起');
      speak('早安！新的一天开始了！');
    } else if (lowerCommand.includes('电影') || lowerCommand.includes('观影')) {
      activateSceneByName('观影');
      speak('准备好观影了！');
    } else {
      setMessage('未识别的指令，请尝试：打开灯光、调高温度、回家模式等');
      speak('未识别的指令，请尝试：打开灯光、调高温度、回家模式等');
    }
  };

  const toggleDeviceByName = (keyword: string, isOn: boolean) => {
    setDevices(devices.map(d => 
      d.name.includes(keyword) ? { ...d, isOn } : d
    ));
  };

  const adjustTemperatureByVoice = (delta: number) => {
    setDevices(devices.map(d => {
      if (d.type === 'temperature' && d.isOn && d.value !== undefined) {
        const newValue = Math.max(16, Math.min(30, d.value + delta));
        return { ...d, value: newValue };
      }
      return d;
    }));
  };

  const activateSceneByName = (keyword: string) => {
    const scene = scenes.find(s => s.name.includes(keyword));
    if (scene) {
      activateScene(scene.id);
    }
  };

  const toggleDevice = (id: string) => {
    setDevices(devices.map(d => 
      d.id === id ? { ...d, isOn: !d.isOn } : d
    ));
  };

  const adjustTemperature = (id: string, value: number) => {
    setDevices(devices.map(d => 
      d.id === id ? { ...d, value } : d
    ));
  };

  const activateScene = async (sceneId: string) => {
    setIsProcessing(true);
    setCurrentScene(sceneId);
    
    const scene = scenes.find(s => s.id === sceneId);
    setMessage(`正在执行「${scene?.name}」...`);
    speak(`正在执行${scene?.name}`);

    await new Promise(resolve => setTimeout(resolve, 1500));

    const newDevices = devices.map(d => {
      const state = scene?.deviceStates.find(s => s.deviceId === d.id);
      if (state) {
        return { ...d, isOn: state.isOn, value: state.value };
      }
      return d;
    });
    setDevices(newDevices);
    
    setMessage(`「${scene?.name}」已执行完成`);

    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsProcessing(false);
    setMessage('');
  };

  const openSceneManager = () => {
    setShowSceneManager(true);
    setEditingScene(null);
    setSceneName('');
    setSceneDescription('');
    setSelectedDevices(devices.map(d => ({ deviceId: d.id, isOn: d.isOn, value: d.value })));
  };

  const editScene = (scene: Scene) => {
    setEditingScene(scene);
    setSceneName(scene.name);
    setSceneDescription(scene.description);
    setSelectedDevices(scene.deviceStates);
    setShowSceneManager(true);
  };

  const deleteScene = (sceneId: string) => {
    if (sceneId.startsWith('custom')) {
      setScenes(scenes.filter(s => s.id !== sceneId));
      setMessage('场景已删除');
    } else {
      setMessage('默认场景无法删除');
    }
  };

  const saveScene = () => {
    if (!sceneName.trim()) {
      setMessage('请输入场景名称');
      return;
    }

    if (editingScene) {
      setScenes(scenes.map(s => 
        s.id === editingScene.id 
          ? { ...s, name: sceneName, description: sceneDescription, deviceStates: selectedDevices }
          : s
      ));
      setMessage('场景已更新');
    } else {
      const newScene: Scene = {
        id: `custom-${Date.now()}`,
        name: sceneName,
        description: sceneDescription || '自定义场景',
        icon: Home,
        deviceStates: selectedDevices,
      };
      setScenes([...scenes, newScene]);
      setMessage('场景已创建');
    }

    setShowSceneManager(false);
    setEditingScene(null);
    setSceneName('');
    setSceneDescription('');
  };

  const toggleSelectedDevice = (deviceId: string) => {
    setSelectedDevices(selectedDevices.map(s => 
      s.deviceId === deviceId ? { ...s, isOn: !s.isOn } : s
    ));
  };

  const adjustSelectedTemperature = (deviceId: string, value: number) => {
    setSelectedDevices(selectedDevices.map(s => 
      s.deviceId === deviceId ? { ...s, value } : s
    ));
  };

  const getRoomDevices = (room: string) => devices.filter(d => d.room === room);
  const rooms = ['客厅', '卧室', '厨房', '大门'];

  const getSelectedDeviceState = (deviceId: string) => {
    return selectedDevices.find(s => s.deviceId === deviceId);
  };

  return (
    <div className="bg-bg-card rounded-2xl border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-accent-primary/20 flex items-center justify-center">
            <Home className="w-5 h-5 text-accent-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-text-primary">智能家居 AI Agent</h3>
            <p className="text-sm text-text-muted">点击设备进行控制，体验智能生活</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={openSceneManager}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-bg-elevated border border-border hover:border-accent-primary/30 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span className="text-sm">场景管理</span>
          </button>
          <button
            onClick={isListening ? stopListening : startListening}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
              isListening 
                ? 'bg-accent-primary text-white animate-pulse' 
                : 'bg-bg-elevated border border-border hover:border-accent-primary/30'
            }`}
          >
            {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            <span className="text-sm">{isListening ? '停止' : '语音控制'}</span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {message && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-6 p-4 rounded-xl bg-accent-primary/10 border border-accent-primary/20"
          >
            <div className="flex items-center gap-3">
              <Volume2 className="w-4 h-4 text-accent-primary" />
              <span className="text-accent-primary font-medium">{message}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {voiceInput && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-6 p-4 rounded-xl bg-bg-elevated border border-border"
          >
            <div className="flex items-center gap-3">
              <Mic className="w-4 h-4 text-accent-primary" />
              <span className="text-text-primary">{voiceInput}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-medium text-text-secondary">快捷场景</h4>
          {isSpeaking && (
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent-primary animate-pulse" />
              <span className="text-xs text-accent-primary">AI 正在说话...</span>
            </div>
          )}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {scenes.map((scene) => {
            const Icon = scene.icon;
            return (
              <div key={scene.id} className="relative">
                <motion.button
                  onClick={() => activateScene(scene.id)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isProcessing}
                  className={`w-full p-3 rounded-xl border transition-all ${
                    currentScene === scene.id
                      ? 'bg-accent-primary/20 border-accent-primary text-accent-primary'
                      : 'bg-bg-elevated border-border text-text-secondary hover:border-accent-primary/30'
                  }`}
                >
                  <Icon className="w-5 h-5 mx-auto mb-2" />
                  <span className="text-xs">{scene.name}</span>
                </motion.button>
                {scene.id.startsWith('custom') && (
                  <div className="absolute -top-1 -right-1 flex gap-1">
                    <button
                      onClick={(e) => { e.stopPropagation(); editScene(scene); }}
                      className="w-5 h-5 rounded-full bg-bg-primary border border-border flex items-center justify-center hover:border-accent-primary/30"
                    >
                      <Edit2 className="w-3 h-3" />
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); deleteScene(scene.id); }}
                      className="w-5 h-5 rounded-full bg-bg-primary border border-border flex items-center justify-center hover:border-red-500/30 hover:text-red-500"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="space-y-6">
        {rooms.map((room) => {
          const roomDevices = getRoomDevices(room);
          if (roomDevices.length === 0) return null;
          
          return (
            <div key={room}>
              <h4 className="text-sm font-medium text-text-secondary mb-3">{room}</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {roomDevices.map((device) => {
                  const Icon = device.icon;
                  return (
                    <motion.div
                      key={device.id}
                      layout
                      className={`p-4 rounded-xl border transition-all cursor-pointer ${
                        device.isOn
                          ? 'bg-accent-primary/10 border-accent-primary/30'
                          : 'bg-bg-elevated border-border'
                      }`}
                      onClick={() => toggleDevice(device.id)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <Icon className={`w-5 h-5 ${device.isOn ? 'text-accent-primary' : 'text-text-muted'}`} />
                        <span className={`w-2 h-2 rounded-full ${device.isOn ? 'bg-accent-primary' : 'bg-text-muted'}`} />
                      </div>
                      <span className={`text-sm ${device.isOn ? 'text-text-primary' : 'text-text-muted'}`}>
                        {device.name}
                      </span>
                      {device.type === 'temperature' && device.isOn && device.value !== undefined && (
                        <div className="mt-2">
                          <input
                            type="range"
                            min="16"
                            max="30"
                            value={device.value}
                            onChange={(e) => adjustTemperature(device.id, parseInt(e.target.value))}
                            className="w-full h-1.5 rounded-full bg-border appearance-none cursor-pointer accent-accent-primary"
                          />
                          <div className="flex justify-between mt-1">
                            <span className="text-xs text-text-muted">16°C</span>
                            <span className="text-xs text-accent-primary">{device.value}°C</span>
                            <span className="text-xs text-text-muted">30°C</span>
                          </div>
                        </div>
                      )}
                      {device.type === 'temperature' && !device.isOn && (
                        <span className={`text-xs mt-1 block text-text-muted`}>
                          关闭状态
                        </span>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 pt-6 border-t border-border">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-sm text-text-secondary">设备状态</span>
            <div className="flex items-center gap-2 mt-1">
              <span className="w-2 h-2 rounded-full bg-accent-primary animate-pulse" />
              <span className="text-sm text-text-primary">{devices.filter(d => d.isOn).length} 台设备运行中</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <span className="text-sm text-text-secondary">能源消耗</span>
              <span className="text-lg font-semibold text-text-primary">12.5 kWh</span>
            </div>
            <div className="text-right">
              <span className="text-sm text-text-secondary">室内温度</span>
              <span className="text-lg font-semibold text-text-primary">24°C</span>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showSceneManager && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowSceneManager(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-bg-primary border border-border rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-border">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-text-primary">
                    {editingScene ? '编辑场景' : '创建新场景'}
                  </h3>
                  <button
                    onClick={() => setShowSceneManager(false)}
                    className="p-2 rounded-lg hover:bg-bg-elevated transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-6">
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">场景名称</label>
                  <input
                    type="text"
                    value={sceneName}
                    onChange={(e) => setSceneName(e.target.value)}
                    placeholder="例如：阅读模式"
                    className="w-full px-4 py-3 rounded-xl bg-bg-elevated border border-border focus:border-accent-primary focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">场景描述</label>
                  <textarea
                    value={sceneDescription}
                    onChange={(e) => setSceneDescription(e.target.value)}
                    placeholder="描述这个场景的效果"
                    rows={2}
                    className="w-full px-4 py-3 rounded-xl bg-bg-elevated border border-border focus:border-accent-primary focus:outline-none transition-colors resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-3">设备状态</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {devices.map((device) => {
                      const Icon = device.icon;
                      const selectedState = getSelectedDeviceState(device.id);
                      const isOn = selectedState?.isOn ?? false;
                      const value = selectedState?.value;
                      
                      return (
                        <div
                          key={device.id}
                          className={`p-4 rounded-xl border transition-all cursor-pointer ${
                            isOn
                              ? 'bg-accent-primary/10 border-accent-primary/30'
                              : 'bg-bg-elevated border-border'
                          }`}
                          onClick={() => toggleSelectedDevice(device.id)}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <Icon className={`w-5 h-5 ${isOn ? 'text-accent-primary' : 'text-text-muted'}`} />
                            <span className={`w-2 h-2 rounded-full ${isOn ? 'bg-accent-primary' : 'bg-text-muted'}`} />
                          </div>
                          <span className={`text-sm ${isOn ? 'text-text-primary' : 'text-text-muted'}`}>
                            {device.name}
                          </span>
                          {device.type === 'temperature' && isOn && (
                            <div className="mt-2">
                              <input
                                type="range"
                                min="16"
                                max="30"
                                value={value || 24}
                                onChange={(e) => adjustSelectedTemperature(device.id, parseInt(e.target.value))}
                                className="w-full h-1.5 rounded-full bg-border appearance-none cursor-pointer accent-accent-primary"
                              />
                              <span className="text-xs text-accent-primary mt-1 block">{value || 24}°C</span>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-border flex justify-end gap-3">
                <button
                  onClick={() => setShowSceneManager(false)}
                  className="px-6 py-3 rounded-xl bg-bg-elevated border border-border hover:border-accent-primary/30 transition-colors"
                >
                  取消
                </button>
                <button
                  onClick={saveScene}
                  className="px-6 py-3 rounded-xl bg-accent-primary text-white hover:bg-accent-primary/90 transition-colors flex items-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  {editingScene ? '保存修改' : '创建场景'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SmartHomeAI;