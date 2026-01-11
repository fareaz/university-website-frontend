import Link from "next/link";

type Props = {
    title: string;
    value: number;
    link: string;
};

export default function StatCard({ title, value, link }: Props) {
    return (
        <Link href={link}>
            <div className="card bg-base-100 shadow hover:shadow-lg transition cursor-pointer">
                <div className="card-body">
                    <p className="text-sm text-gray-500">{title}</p>
                    <p className="text-3xl font-bold">{value}</p>
                </div>
            </div>
        </Link>
    );
}