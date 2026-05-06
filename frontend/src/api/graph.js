import service, { requestWithRetry } from './index'

/**
 * 生成本体（上传文档和模拟需求）
 * @param {Object} data - 包含files, simulation_requirement, project_name等
 * @returns {Promise}
 */
export function generateOntology(formData) {
  return requestWithRetry(() =>
    service({
      url: '/api/graph/ontology/generate',
      method: 'post',
      data: formData,
      timeout: 900000, // 15分钟超时用于文件上传和本体生成
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }),
    5,    // maxRetries - 尝试更多次
    2000  // initial delay 2秒
  )
}

/**
 * 构建图谱
 * @param {Object} data - 包含project_id, graph_name等
 * @returns {Promise}
 */
export function buildGraph(data) {
  return requestWithRetry(() =>
    service({
      url: '/api/graph/build',
      method: 'post',
      data
    })
  )
}

/**
 * 查询任务状态
 * @param {String} taskId - 任务ID
 * @returns {Promise}
 */
export function getTaskStatus(taskId) {
  return requestWithRetry(() =>
    service({
      url: `/api/graph/task/${taskId}`,
      method: 'get'
    }),
    2,    // maxRetries (fewer retries for frequent polling)
    300   // initial delay in ms
  )
}

/**
 * 获取图谱数据
 * @param {String} graphId - 图谱ID
 * @returns {Promise}
 */
export function getGraphData(graphId) {
  return requestWithRetry(() =>
    service({
      url: `/api/graph/data/${graphId}`,
      method: 'get'
    }),
    3,    // maxRetries
    500   // initial delay in ms (shorter for polling)
  )
}

/**
 * 获取项目信息
 * @param {String} projectId - 项目ID
 * @returns {Promise}
 */
export function getProject(projectId) {
  return requestWithRetry(() =>
    service({
      url: `/api/graph/project/${projectId}`,
      method: 'get'
    }),
    2,    // maxRetries
    300   // initial delay in ms
  )
}
