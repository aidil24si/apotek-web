import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card } from "./ui/card";
import medicinesData from "../data/medicines.json";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      type: "bot",
      text: "Halo! 👋 Selamat datang di Apotek Sehat. Ada yang bisa saya bantu?",
      options: [
        "Cek Ketersediaan Obat",
        "Info Dokter",
        "Alamat & Jam Operasional",
        "Lainnya"
      ]
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleOptionClick = (option) => {
    // Add user message
    setMessages(prev => [...prev, { type: "user", text: option }]);
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      setIsTyping(false);
      let botResponse = { type: "bot", text: "", options: [] };

      switch (option) {
        case "Cek Ketersediaan Obat":
        case "Cek Obat Lainnya":
          botResponse = {
            type: "bot",
            text: "Berikut adalah beberapa obat yang tersedia di apotek kami:",
            options: medicinesData.map(med => `${med.name} (Stok: ${med.stock})`).slice(0, 4)
          };
          break;
        case "Info Dokter":
          botResponse = {
            type: "bot",
            text: "Dokter yang bertugas di Apotek Sehat:",
            options: [
              "Dr. Sarah Wijaya - Spesialis Penyakit Dalam",
              "Dr. Ahmad Hidayat - Spesialis Anak",
              "Dr. Siti Nurhaliza - Spesialis Kandungan",
              "Kembali ke Menu Utama"
            ]
          };
          break;
        case "Alamat & Jam Operasional":
          botResponse = {
            type: "bot",
            text: "📍 Alamat: Jl. Kesehatan No. 123, Jakarta Pusat\n\n🕐 Jam Operasional:\nSenin - Jumat: 08:00 - 21:00\nSabtu - Minggu: 09:00 - 18:00\n\n📞 Telepon: (021) 1234-5678",
            options: ["Kembali ke Menu Utama"]
          };
          break;
        case "Kembali ke Menu Utama":
          botResponse = {
            type: "bot",
            text: "Halo! 👋 Ada yang bisa saya bantu lagi?",
            options: [
              "Cek Ketersediaan Obat",
              "Info Dokter",
              "Alamat & Jam Operasional",
              "Lainnya"
            ]
          };
          break;
        case "Lainnya":
          botResponse = {
            type: "bot",
            text: "Silakan pilih topik lain:",
            options: [
              "Cek Ketersediaan Obat",
              "Info Dokter",
              "Alamat & Jam Operasional"
            ]
          };
          break;
        default:
          // Check if user selected a medicine
          const selectedMedicine = medicinesData.find(med => 
            option.toLowerCase().includes(med.name.toLowerCase())
          );
          
          if (selectedMedicine) {
            botResponse = {
              type: "bot",
              text: `📦 **${selectedMedicine.name}**\n\n` +
                    `Kategori: ${selectedMedicine.category}\n` +
                    `Stok: ${selectedMedicine.stock} ${selectedMedicine.unit}\n` +
                    `Harga: ${selectedMedicine.price}\n` +
                    `Deskripsi: ${selectedMedicine.description}\n\n` +
                    `Apakah ada yang bisa saya bantu lagi?`,
              options: ["Cek Obat Lainnya", "Kembali ke Menu Utama"]
            };
          } else {
            botResponse = {
              type: "bot",
              text: "Maaf, saya tidak mengerti. Silakan pilih opsi di bawah ini:",
              options: [
                "Cek Ketersediaan Obat",
                "Info Dokter",
                "Alamat & Jam Operasional"
              ]
            };
          }
      }

      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    const query = inputValue.trim();
    if (!query) return;

    setMessages(prev => [...prev, { type: "user", text: query }]);
    setIsTyping(true);
    setInputValue("");

    setTimeout(() => {
      setIsTyping(false);
      
      const foundMedicine = medicinesData.find(med => 
        med.name.toLowerCase().includes(query.toLowerCase())
      );

      if (foundMedicine) {
        setMessages(prev => [...prev, {
          type: "bot",
          text: `📦 **Hasil Pencarian Obat:**\n\n` +
                `**Nama:** ${foundMedicine.name}\n` +
                `**Kategori:** ${foundMedicine.category}\n` +
                `**Stok:** ${foundMedicine.stock} ${foundMedicine.unit}\n` +
                `**Harga:** ${foundMedicine.price}\n` +
                `**Deskripsi:** ${foundMedicine.description}\n\n` +
                `Apakah ada yang bisa saya bantu lagi?`,
          options: ["Cek Ketersediaan Obat", "Kembali ke Menu Utama"]
        }]);
      } else {
        setMessages(prev => [...prev, {
          type: "bot",
          text: `Saya tidak menemukan obat dengan kata kunci "${query}". Ingin mengecek katalog ketersediaan obat kami?`,
          options: ["Cek Ketersediaan Obat", "Kembali ke Menu Utama"]
        }]);
      }
    }, 1200);
  };

  return (
    <>
      {/* Chatbot Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-[#2563EB] hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-50"
        >
          <MessageSquare size={24} />
        </button>
      )}

      {/* Chatbot Window */}
      {isOpen && (
        <Card className="fixed bottom-6 right-6 w-[380px] h-[500px] shadow-2xl rounded-2xl flex flex-col z-50 overflow-hidden">
          {/* Header */}
          <div className="bg-[#2563EB] text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <MessageSquare size={20} />
              </div>
              <div>
                <h3 className="font-bold text-sm">Apotek Sehat Assistant</h3>
                <p className="text-xs text-blue-100">Online • Biasanya merespon dalam 1 menit</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-white/20 p-2 rounded-full transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl p-3 ${
                    msg.type === "user"
                      ? "bg-[#2563EB] text-white rounded-br-none"
                      : "bg-white text-gray-800 rounded-bl-none shadow-sm"
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                  
                  {/* Options */}
                  {msg.options && msg.options.length > 0 && (
                    <div className="mt-3 space-y-2">
                      {msg.options.map((option, optIdx) => (
                        <button
                          key={optIdx}
                          onClick={() => handleOptionClick(option)}
                          className="w-full text-left px-3 py-2 bg-gray-50 hover:bg-blue-50 text-gray-700 hover:text-[#2563EB] rounded-lg text-xs font-medium transition-all flex items-center justify-between group"
                        >
                          <span>{option}</span>
                          <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white rounded-2xl rounded-bl-none p-3 shadow-sm">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form onSubmit={handleSendMessage} className="p-3 border-t bg-white">
            <div className="flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ketik pesan Anda..."
                className="flex-1 bg-gray-50 border-none rounded-full text-sm"
              />
              <Button
                type="submit"
                size="icon"
                className="bg-[#2563EB] hover:bg-blue-700 rounded-full"
              >
                <Send size={18} />
              </Button>
            </div>
          </form>
        </Card>
      )}
    </>
  );
}