var setStats = function(){
  // SET STATS
  var stats = new Stats();
  stats.domElement.style.position = 'absolute';
  stats.domElement.style.top = '0px';
  var container = document.createElement('div');
  container.appendChild(stats.domElement);
  document.body.appendChild(container);
  return stats;
}
