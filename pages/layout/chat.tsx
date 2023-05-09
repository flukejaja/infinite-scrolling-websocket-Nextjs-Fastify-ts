import { useEffect, useState, useRef } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';
const random = function (arr: string[]) {
    return arr[Math.floor((Math.random() * arr.length))];
}
export default function Chat() {
    const [socketUrl] = useState<string>(`ws://localhost:8000/websocket/chat?username=${random(['mongo', 'jones', 'alex', 'son'])}`);
    const [messageHistory, setMessageHistory] = useState<any[]>([]);
    const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl);
    const [text, setText] = useState<string>('')
    const messagesEndRef = useRef<null | HTMLParagraphElement>(null);
    useEffect(() => {
        if (lastMessage !== null) {
            setMessageHistory((prev) => prev.concat(JSON.parse(lastMessage.data)));
        }
    }, [lastMessage, setMessageHistory]);
    const connectionStatus = {
        [ReadyState.CONNECTING]: 'Connecting',
        [ReadyState.OPEN]: 'Open',
        [ReadyState.CLOSING]: 'Closing',
        [ReadyState.CLOSED]: 'Closed',
        [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
    }[readyState];

    const handleKeyDown = (event: { key: string; }) => {
        if (event.key === 'Enter') {
            handleSendMessage(text)
        }
    }

    const handleSendMessage = (text: string) => {
        if (readyState === ReadyState.OPEN) {
            sendMessage(text)
            setText('');
            if (messagesEndRef !== null) {
                messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }
    return (
        <div className='flex flex-col h-full'>
            <div className='h-[6%] flex flex-col'>
                <p className='text-center'>Messenger</p>
                <span className='pl-2'>Status server : {connectionStatus}</span>
            </div>
            <ul className='flex flex-col  px-10 h-[90%] overflow-auto'>
                {messageHistory.map((data, idx) => (
                    <span key={idx}> {data ? <div>{data.sender} : {data.message}</div> : null}</span>
                ))}
                <div ref={messagesEndRef} >&nbsp;</div>
            </ul>
            <div className=' h-[10%] border-y flex justify-center items-center px-10 py-5 relative' >
                <button className=' absolute inset-y-[6.3] right-3 bg-white border h-10 w-14 rounded-lg' onClick={() => handleSendMessage(text)}>SEND</button>
                <input type='text' className='w-full h-full border pl-5 rounded-lg outline-none' onKeyDown={handleKeyDown} value={text} onChange={(e) => setText(e.target.value)} />
            </div>
        </div>
    );
}