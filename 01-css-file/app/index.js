
import './index.css';
import './index2.css';
import './sass.scss';
import './less.less';

var h1 = document.createElement('h1');
h1.innerHTML = 'Hi Evoque!!';

  
var func = () => {
    var root = document.getElementById('root');
    root.appendChild(h1);
}

func();
