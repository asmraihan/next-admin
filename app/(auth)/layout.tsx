import { Button } from "@/components/ui/button"
import { ArrowRight, MoveRight, StoreIcon, Warehouse } from "lucide-react"
import Link from "next/link"

export default function AuthLayout({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex flex-col-reverse lg:flex-row lg:items-center lg:h-full justify-center lg:justify-start gap-10 lg:gap-32">
            <div className="lg:w-1/2 lg:h-full bg-slate-900 flex-col p-10 text-white dark:border-r flex">
                <div className="flex items-center text-lg font-medium mb-10">
                    <Warehouse className="mr-2" size={20} />
                    Next Store Manager
                </div>

                <div className="space-y-3 border p-5 lg:p-10 rounded-xl">
                    <h1 className="lg:my-8">
                        <span className="text-2xl lg:text-4xl font-bold ">Welcome to the Next Store Manager</span>
                    </h1>
                    {/* demo/trail email and pass */}
                    <h2><span className="text-base lg:text-xl font-semibold text-gray-300">Demo Email: xtsad@mail.co</span></h2>
                    <h2><span className="text-base lg:text-xl font-semibold text-gray-300">Demo Password: asd123@</span></h2>
                </div>

                <div
                    id="create-a-store-banner"
                    aria-labelledby="create-a-store-banner-heading"
                    className="grid place-items-center gap-6 rounded-lg text-center shadow-sm my-10 lg:my-20"
                >
                    <h2 className="text-xl lg:text-4xl font-bold ">
                        Check out the E-commerce Store
                    </h2>

                    <Link href="https://next-store-asmraihan.vercel.app"
                        target="_blank"

                    >
                        <Button className="flex justify-center items-center group"
                            variant={'outline'}
                        >

                            <span className="font-semibold text-primary">View Store
                            </span>
                            <ArrowRight className=" text-black transition-all translate-x-0 group-hover:translate-x-1" size={20} />
                        </Button>
                    </Link>
                </div>




            </div>
            {children}
        </div>
    )
}