<#-- Ваш заголовок успішної збірки -->
<#global subject>[SUCCESS] ${project.name}:${buildType.name} - Build: ${build.buildNumber}</#global>

<#-- Тіло повідомлення про успішну збірку -->
<#global body>Команда Колорджоб вітає вас з успішною збіркою ${project.name}:${buildType.name} - Build: ${build.buildNumber}.
Деталі збірки:
Agent: ${agentName}
Результати збірки: ${link.buildResultsLink}

<@common.footer/></#global>

<#-- HTML-версія тіла повідомлення -->
<#global bodyHtml>
<div>
  <div>
    Команда Колорджоб вітає вас з успішною збіркою <i>${project.name}:${buildType.name} - <a href='${link.buildResultsLink}'>Build: ${build.buildNumber}</a></i>.
  </div>
  <@common.build_agent build/>
  <br>
  <@common.build_changes var.changesBean/>
  <@common.compilation_errors var.compilationBean/>
  <@common.test_errors var.failedTestsBean/>

  <@common.footerHtml/>
</div>
</#global>
