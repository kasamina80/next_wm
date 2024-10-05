import Sidebar from '../components/Sidebar';
import '../src/app/index.css'
import '../src/app/app.scss'
import '../src/app/histories.css'
import type { WorkHistory } from "../seeds/histories_type.ts";
import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from '../server';

type ItEngineerHistory = WorkHistory & { work_type: "it_engineer" };
type IdolHistory = WorkHistory & { work_type: "idol" };

// エンジニアの経歴
const itEngineerHistoriesFilter = (histories: WorkHistory[]): ItEngineerHistory[] => {
  return histories.filter((history): history is ItEngineerHistory => history.work_type === "it_engineer");
}

// アイドルの経歴
const idolHistoriesFilter = (histories: WorkHistory[]): IdolHistory[] => {
  return histories.filter((history): history is IdolHistory => history.work_type === "idol");
}

// 日付テキストを生成
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

// 経歴一覧HTMLを生成
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

const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: 'http://localhost:4000',
      fetch(url, options) {
        return fetch(url, {
          ...options,
          credentials: 'include'
        });
      },
    }),
  ],
});

export const getServerSideProps = (async () => {
  // tRPCで一覧を取得
  const fetchedWorkHistories = await trpc.workHistoryList.query();
  // propsとしてデータをフロントに渡す
  // returnしたものはJSONになるが、Dateはserializableではないので、もう1段JSONをかませる
  return { props: { historiesJson: JSON.stringify(fetchedWorkHistories) } };
});

const HistoriesPage = ({ historiesJson }: { historiesJson: string }) => {
  // const [workHistories, setWorkHistories] = useState([] as WorkHistory[]);

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
        <div className="italic-wrapper">
          <p className="kasamina italic">重なる想い、みんなとともに。<br />MORE MORE TYPE! のかさみなです!</p>
        </div>
        <p className="history-type-description">平日は会社員、週末はアイドルとして活動しています。</p>
        {
          historyTable(idolHistories)
        }
      </div>
    </div>
  );
}

export default HistoriesPage;
