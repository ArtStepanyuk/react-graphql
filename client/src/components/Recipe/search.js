import React from "react";
import { Query } from "react-apollo";
import { SEARCH_RECIPES } from "../../queries";
import { Link } from "react-router-dom";
import { ApolloConsumer } from "react-apollo";

export default class Search extends React.Component {
  state = {
    searchTerm: "",
    recipes: []
  };

  handleChange({ searchRecipes }) {
    this.setState(() => ({ recipes: searchRecipes }));
  }



  render() {
    const { recipes } = this.state;
    return (
      <ApolloConsumer>
        {client => (
          <div>
            <input
              type="search"
              onChange={async event => {
                event.persist();
                const { data } = await client.query({
                  query: SEARCH_RECIPES,
                  variables: { searchTerm: event.target.value }
                });
                this.handleChange(data);
              }}
            />
            <ul>
              {recipes.map(recipe => (
                <li key={recipe._id}>
                  <Link to={`/recipe/${recipe._id}`}>
                    <h4>name: {recipe.name}</h4>
                  </Link>
                  <p>{recipe.likes}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </ApolloConsumer>
    );
  }
}

// <Query query={SEARCH_RECIPES} variables={{ searchTerm: "" }}>
//   {({ data, loading, error }) => {
//     if (loading) return <div>Loading</div>;
//     if (error) return <div>error</div>;
//     console.log(data);
//     return (
//       <div>
//         <input type="search" value={searchTerm} />;
//         <ul>
//           {data.searchRecipes.map(recipe => (
//             <li key={recipe._id}>
//               <Link to={`/recipe/${recipe._id}`}>
//                 <h4>name: {recipe.name}</h4>
//               </Link>
//               <p>{recipe.likes}</p>
//             </li>
//           ))}
//         </ul>
//       </div>
//     );
//   }}
// </Query>
//   );
// }
