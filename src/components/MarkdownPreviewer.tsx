import { useState, useEffect } from "react";
import { marked } from "marked";
import DOMPurify from "dompurify";

interface SelectInputProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string; label: string }[];
}
marked.setOptions({
  gfm: true,
  breaks: true,
  async: false,
});
const SelectInput: React.FC<SelectInputProps> = ({ value, onChange, options }) => (
  <select className="border rounded-md border-black px-2" value={value} onChange={onChange}>
    {options.map((option) => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ))}
  </select>
);

const MarkdownPreviewer: React.FC = () => {
  // State
  const [selectedVersion, setSelectedVersion] = useState("15.0.7");
  const [selectedPreviewer, setSelectedPreviewer] = useState("Preview");
  const [selectedMarkdown, setSelectedMarkdown] = useState("Markdown");
  const [markdown, setMarkdown] = useState("# Hello, Markdown!");

  // Options
  const versionOptions = ["15.0.7", "14.1.0", "13.0.0", "12.0.0"].map((v) => ({ value: v, label: v }));
  const previewerOptions = ["Preview", "HTML Source", "Lecer Data", "Quick Reference"].map((v) => ({
    value: v,
    label: v,
  }));
  const markdownOptions = ["Markdown", "Option"].map((v) => ({ value: v, label: v }));

  const [responseTime, setResponseTime] = useState<number | null>(null);

  const convertMarkdown = () => {
    const start = performance.now(); // Bắt đầu đo thời gian
    const end = performance.now(); // Kết thúc đo thời gian
    setResponseTime(end - start); // Tính thời gian phản hồi
  };

  useEffect(() => {
    convertMarkdown(); // Chạy khi markdown thay đổi
  }, [markdown]);

  const [html, setHtml] = useState<string>("");

  useEffect(() => {
    const renderMarkdown = async () => {
      const parsedMarkdown = await marked(markdown, { async: true }); // ✅ Chờ kết quả từ Promise
      setHtml(DOMPurify.sanitize(parsedMarkdown)); // ✅ Đảm bảo giá trị là string trước khi setState
    };

    renderMarkdown();
  }, [markdown]);
  return (
    <div className="flex h-full gap-2 p-4 font-sans text-base">
      {/* Input Area */}
      <div className="w-1/2">
        <div className="flex flex-wrap gap-1 mb-2">
          <span>Input</span>.
          <a href="http://localhost:5173/" className="underline text-blue-600">
            Permalink
          </a>
          .
          <span>Version:</span>
          <SelectInput value={selectedVersion} onChange={(e) => setSelectedVersion(e.target.value)} options={versionOptions} />
          .
          <button className="border rounded-md border-black px-2 bg-gray-200">Clear</button>
          <SelectInput value={selectedMarkdown} onChange={(e) => setSelectedMarkdown(e.target.value)} options={markdownOptions} />
        </div>
        <textarea
          className="w-full h-full resize-none border border-gray-400 p-3"
          value={markdown}
          onChange={(e) => setMarkdown(e.target.value)}
          placeholder="Type your markdown here..."
        />
      </div>

      {/* Output Area */}
      <div className="w-1/2">
        <div className="flex flex-wrap gap-1 mb-2">
          <SelectInput value={selectedPreviewer} onChange={(e) => setSelectedPreviewer(e.target.value)} options={previewerOptions} />
          .
          <span>Response Time: {responseTime ? responseTime.toFixed(2) : "0"} ms</span>
        </div>
        <div className="flex border border-gray-400 h-full p-3 markdown-preview" 
        dangerouslySetInnerHTML={{ __html: html }} 
        />
      </div>
    </div>
  );
};

export default MarkdownPreviewer;
