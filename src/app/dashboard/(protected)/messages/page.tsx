import { format } from "date-fns";
import { connectDB } from "@/lib/mongodb";
import Message from "@/models/Message";
import MarkReadButton from "@/components/dashboard/MarkReadButton";
import DeleteButton from "@/components/dashboard/DeleteButton";

export const dynamic = "force-dynamic";

export default async function MessagesPage() {
  await connectDB();
  const messages = await Message.find({}).sort({ createdAt: -1 }).lean();

  return (
    <div>
      <h1 className="font-display text-3xl font-semibold">Messages</h1>
      <p className="mt-2 text-text-muted">
        Messages submitted through your contact form.
      </p>

      {messages.length === 0 ? (
        <p className="mt-10 text-text-muted">No messages yet.</p>
      ) : (
        <div className="mt-8 max-w-3xl space-y-4">
          {messages.map((msg) => (
            <div
              key={String(msg._id)}
              className={`rounded-2xl border p-6 ${
                msg.read
                  ? "border-border bg-surface"
                  : "border-green-bright/40 bg-green-dim/20"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-medium">{msg.name}</p>
                    <span className="font-mono text-xs text-text-faint">
                      &lt;{msg.email}&gt;
                    </span>
                    {!msg.read && (
                      <span className="rounded-full bg-green-bright/20 px-2 py-0.5 font-mono text-[10px] uppercase text-green-bright">
                        New
                      </span>
                    )}
                  </div>
                  {msg.subject && (
                    <p className="mt-1 text-sm text-text-muted">
                      {msg.subject}
                    </p>
                  )}
                  <p className="mt-1 font-mono text-xs text-text-faint">
                    {format(new Date(msg.createdAt), "MMM d, yyyy · h:mm a")}
                  </p>
                </div>

                <div className="flex shrink-0 items-center gap-3">
                  <MarkReadButton id={String(msg._id)} read={msg.read} />
                  <DeleteButton
                    endpoint={`/api/messages/${msg._id}`}
                    itemName={`message from ${msg.name}`}
                  />
                </div>
              </div>

              <p className="mt-4 whitespace-pre-wrap text-sm leading-relaxed text-text-primary/90">
                {msg.message}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
