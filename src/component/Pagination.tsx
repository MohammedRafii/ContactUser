type DataContacts = [{ _id: string; name: string; email: string; phone: number }];
const Pagination = ({page,data,selectPageHandler}:{page:number,data:DataContacts,selectPageHandler:(s:number)=>void }) => {
  return (
<div className="mx-auto flex items-center py-2 text-2xl">
        <div className="flex items-center mx-auto">
          <span onClick={() => selectPageHandler(page - 1)} className={`${page > 1 ? "" : "hidden"} mr-2  font-medium hover:underline cursor-pointer active:underline`}>Prev</span>
          <div className="flex mx-auto m-4  text-xl">
            {[...Array(Math.ceil(data.length / 7))].map((_, i) => {
              return <span key={i} onClick={() => selectPageHandler(i + 1)} className={`rounded-full p-2 px-4 cursor-pointer mx-2 ${page === i + 1 ? "scale-125 text-white bg-blue-800" : " bg-gray-400 "}`}>{i + 1}</span>
            })}
          </div>
          <span onClick={() => selectPageHandler(page + 1)} className={`${page < Math.ceil(data.length / 7) ? "" : "hidden"} cursor-pointer ml-2 font-medium hover:underline active:underline`}>Next</span>
        </div>
      </div>

  )
}

export default Pagination