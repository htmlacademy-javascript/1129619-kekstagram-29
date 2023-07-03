import { similarPhotoPost } from './data.js';

const commentsFragment = document.createDocumentFragment();

similarPhotoPost.forEach(({ comments }) => {
  const commentsList = document.createElement('ul');
  comments.forEach((elem) => {
    const commentConteiner = document.createElement('li');
    const commentСontent = document.createElement('img');
    const socialText = document.createElement('p');

    commentConteiner.classList.add('social__comment');

    commentСontent.classList.add('social__picture');
    commentСontent.src = elem.avatar;
    commentСontent.alt = elem.name;
    commentСontent.width = '35';
    commentСontent.height = '35';

    socialText.classList.add('socialText');
    socialText.textContent = elem.message;

    commentConteiner.append(commentСontent);
    commentConteiner.append(socialText);

    commentsList.append(commentConteiner);
  });

  commentsFragment.append(commentsList);
});

export { commentsFragment };

console.log(commentsFragment);
