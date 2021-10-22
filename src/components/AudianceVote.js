import React from "react";


export default function AudianceVote({question}) {
   

  return (
    <div>
      <div className="AudianceVote">
       {
           question.map((vote)=>(
            <div className="vote" style={{ height:`${ vote.pource}%` }}>
            {vote.id}
          </div>
          ))

       }
      
      </div>
    </div>
  );
}
