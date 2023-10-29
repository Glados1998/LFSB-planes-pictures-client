import Link from "next/link";

export default function index() {
    return (
        <div>
            <h1>Admin</h1>
            <div>
                <Link href="/admin/aircraft-operator">
                    Operator
                </Link>
                <Link href="/admin/aircraft">
                    Aircraft
                </Link>
                <Link href="/admin/aircraft-name">
                    Aircraft name
                </Link>
            </div>
        </div>
    )
}
