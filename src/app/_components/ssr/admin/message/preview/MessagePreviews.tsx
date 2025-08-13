import { Message } from "@/app/_shared/types";
import { getRecentMessages } from "@/app/_lib/backend/repositories/messages.repo";


export default function MessagePreviews({
  messages,
  amount
}: {
  messages: Message[];
  amount?: number;
}) {
  const { data: recentMessages } = getRecentMessages();

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