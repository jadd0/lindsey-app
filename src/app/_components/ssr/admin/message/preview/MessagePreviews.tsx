import { Message } from "@/app/_shared/types";


export default function MessagePreviews({
  messages,
  amount
}: {
  messages: Message[];
  amount?: number;
}) {
  return (
    <div className="flex flex-col items-center">
      <ul className="list-disc">
        {messages.map((message) => (
          <li key={message.id} className="mb-2">
            {message.content}
          </li>
        ))}
      </ul>
      <button>View more...</button>
    </div>
  );
}