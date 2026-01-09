import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";

interface MarkdownProps {
	children: string | null | undefined;
}

export default function Markdown({ children }: MarkdownProps) {
	return (
		<div className="prose">
			<ReactMarkdown
				remarkPlugins={[remarkGfm]}
				rehypePlugins={[rehypeHighlight]}
			>
				{children}
			</ReactMarkdown>
		</div>
	);
}
