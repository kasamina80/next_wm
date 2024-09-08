import Sidebar from '../components/Sidebar';
import '../src/app/index.css'
import '../src/app/app.scss'
import '../src/app/histories.css'
import type { WorkHistory } from "../seeds/histories_type.ts";
import { PrismaClient } from '@prisma/client';

type ItEngineerHistory = WorkHistory & { work_type: "it_engineer" };
type IdolHistory = WorkHistory & { work_type: "idol" };

const itEngineerHistoriesFilter = (histories: WorkHistory[]): ItEngineerHistory[] => {
  return histories.filter((history): history is ItEngineerHistory => history.work_type === "it_engineer");
}

const idolHistoriesFilter = (histories: WorkHistory[]): IdolHistory[] => {
  return histories.filter((history): history is IdolHistory => history.work_type === "idol");
}

const historyToDateText = (history: WorkHistory): string => {
  const { start_on, end_on } = history;
  if (end_on !== null) {
    return `${start_on.toLocaleDateString()}～${end_on.toLocaleDateString()}`
  } else {
    if(history.point) {
      return `${start_on.toLocaleDateString()}`
    } else {
      return `${start_on.toLocaleDateString()}～`
    }
  }
}

const historyTable = (histories: WorkHistory[]): React.JSX.Element => {
  return (
    <div className="history-table-wrapper">
      <table className="history-list">
        <tbody>
          {
            histories.map(history => 
              <tr key={ history.id }>
                <td>{ historyToDateText(history) }</td>
                <td>{ history.content }</td>
              </tr>
            )
          }
        </tbody>
      </table>
    </div>
  );
}


export const getServerSideProps = (async () => {
  // Prismaからデータを取ってくる
  const prisma = new PrismaClient();
  const fetchedWorkHistories = await prisma.workHistory.findMany();
  // データをpropsとして渡す
  // returnしたものはJSONになるが、Dateはserializableではないので、もう1段JSONをかませる
  return { props: { historiesJson: JSON.stringify(fetchedWorkHistories) } };
});

const HistoriesPage = ({ historiesJson }: { historiesJson: string }) => {
  const histories: WorkHistory[] = JSON.parse(historiesJson, (key, value) => {
    if ((key == "start_on" || key == "end_on") && value !== null) {
      return new Date(value);
    } else {
      return value;
    }
  });
  const itEngineerHistories: ItEngineerHistory[] = itEngineerHistoriesFilter(histories);
  const idolHistories: IdolHistory[] = idolHistoriesFilter(histories);
  
  return (
    <div id="root">
      <Sidebar />
      <div className="App">
        <h2 className="history-type">IT ENGINEER</h2>
        <p className="history-type-description">ITエンジニアとしての経歴</p>
        {
          historyTable(itEngineerHistories)
        }
        <h2 className="history-type">IDOL</h2>
        <p className="kasamina italic">重なる想い、みんなとともに。<br />MORE MORE TYPE! のかさみなです!</p>
        <p className="history-type-description">平日は会社員、週末はアイドルとして活動しています。</p>
        {
          historyTable(idolHistories)
        }
      </div>
    </div>
  );
}

export default HistoriesPage;
