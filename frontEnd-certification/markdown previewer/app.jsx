const projectName = "markdown-previewer";

// ALLOWS LINE BREAKS WITH RETURN BUTTON
marked.setOptions({
  breaks: true,
});

// INSERTS target="_blank" INTO HREF TAGS (required for Codepen links)
const renderer = new marked.Renderer();
renderer.link = function (href, title, text) {
  return `<a target="_blank" href="${href}">${text}</a>`;
};

////////////////////////////////
////////////////////////////////
////////////////////////////////
////////////////////////////////
////////////////////////////////
////////////////////////////////
////////////////////////////////

const App = () => {
  const [text, setText] = React.useState(placeholder);
  const [isEditor, setIsEditor] = React.useState(true);
  const [isPreview, setIsPreview] = React.useState(true);

  const switchEditor = () => setIsPreview(!isPreview);
  const switchPreview = () => setIsEditor(!isEditor);

  const handleChange = (e) => setText(e.target.value);

  return (
    <div>
      <Editor
        status={isEditor}
        setStatus={switchEditor}
        text={text}
        handleChange={handleChange}
      />
      <Preview status={isPreview} setStatus={switchPreview} html={text} />
    </div>
  );
};

const Header = ({ text, status, setStatus }) => {
  const [icon, setIcon] = React.useState(true);
  return (
    <div className="header">
      <div className="title">
        <span>
          <i class="fa-brands fa-free-code-camp"></i>
        </span>
        <div>{text}</div>
      </div>
      <button
        onClick={() => {
          setIcon(!icon);
          setStatus();
        }}
      >
        {icon ? (
          <i class="fa-solid fa-maximize"></i>
        ) : (
          <i class="fa-solid fa-minimize"></i>
        )}
      </button>
    </div>
  );
};

const Editor = ({ status, setStatus, text, handleChange }) => {
  return (
    <div className={status ? "editor" : "editor hide"}>
      <Header text="editor" status={status} setStatus={setStatus} />
      <textarea value={text} onChange={handleChange} id="editor" />
    </div>
  );
};

const Preview = ({ html = "", status, setStatus }) => {
  const markdown = () => {
    let rawMarkDown = marked.parse(html);

    return { __html: rawMarkDown };
  };

  return (
    <div className={status ? "preview" : "preview hide"}>
      <Header text="preview" status={status} setStatus={setStatus} />
      <div dangerouslySetInnerHTML={markdown()} id="preview" />
    </div>
  );
};

const placeholder = `# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:

Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`

You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.org), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | -------------
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbered lists too.
1. Use just 1s if you want!
1. And last but not least, let's not forget embedded images:

![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)
`;

ReactDOM.render(<App />, document.getElementById("root"));
