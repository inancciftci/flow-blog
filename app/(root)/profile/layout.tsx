import UserImage from "@/components/user/UserImage";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div className="bg-primary-500">
        <div className="container">
          <div className="grid grid-cols-[30%_1fr] gap-10">
            <div>
              <UserImage />
            </div>
            <div>
              <div className="flex items-center justify-center gap-10">
                <div className="flex flex-col gap items-center">
                  <span className="font-bold text-5xl">0</span>
                  <p className="text-slate-500 font-bold">Bookmarks</p>
                </div>
                <div className="flex flex-col items-center">
                  <span className="font-bold text-5xl">0</span>
                  <p className="text-slate-500 font-bold">Comments</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="my-6 container">{children}</div>
    </div>
  );
}
