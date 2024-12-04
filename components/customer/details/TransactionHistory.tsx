import Card from "@/components/common/Card";
import { CurrencyRupeeRounded } from "@mui/icons-material";
import React from "react";

const TS = [
  {
    id: "1",
    amount: 1100,
    createdAt: Date(),
    opening: 2200,
    closing: 1100,
  },
  {
    id: "2",
    amount: 1100,
    createdAt: Date(),
    opening: 2200,
    closing: 1100,
  },
  {
    id: "3",
    amount: 1100,
    createdAt: Date(),
    opening: 2200,
    closing: 1100,
  },
  {
    id: "4",
    amount: 1100,
    createdAt: Date(),
    opening: 2200,
    closing: 1100,
  },
  {
    id: "5",
    amount: 1100,
    createdAt: Date(),
    opening: 2200,
    closing: 1100,
  },
];

const TransactionHistory = ({ transactions }: { transactions: any[] }) => {
  return (
    <Card title="Recent Transactions">
      <ul className="grid md:grid-cols-2 gap-4">
        {!transactions.length && <p>No Recent Transactions</p>}
        {transactions.map((t) => (
          <li
            key={t.id}
            className="grid grid-cols-2 gap-4 p-4 rounded-lg border-slate-200 border"
          >
            <div className="flex flex-col justify-self-start items-center">
              <div className="flex items-center">
                <CurrencyRupeeRounded color="action" fontSize="small" />
                <p className="positive font-medium text-lg">{t.amount}</p>
              </div>
              {/* <p className="text-xs font-light">Amount</p> */}
            </div>
            <div className="flex flex-col justify-self-end items-center">
              <p>{new Date(t.createdAt).toDateString()}</p>
              {/* <p className="text-xs font-light">Date</p> */}
            </div>
            <div className="flex flex-col  justify-self-start items-center">
              <div className="flex items-center text-sm">
                <CurrencyRupeeRounded color="action" fontSize="small" />
                <p>{t.opening}</p>
              </div>
              <p className="text-xs font-light">Opening</p>
            </div>
            <div className="flex flex-col justify-self-end items-center">
              <div className="flex items-center text-sm">
                <CurrencyRupeeRounded color="action" fontSize="small" />
                <p>{t.closing}</p>
              </div>
              <p className="text-xs font-light">Closing</p>
            </div>
          </li>
        ))}
      </ul>
    </Card>
  );
};

export default TransactionHistory;
